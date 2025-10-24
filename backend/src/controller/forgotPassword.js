import { findOne } from '../models/userModel';
import { createTransport } from 'nodemailer';

export async function forgotPassword(req, res) {
    const { email } = req.body;
    try {
        const user = await findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Email tapılmadı' });
        }
        // Random kod yaradılır
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        user.resetCode = code;
        await user.save();
        // Email göndər
        const transporter = createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Şifrəni sıfırlama kodu',
            text: `Sizin sıfırlama kodunuz: ${code}`,
        });
        res.json({ message: 'Kod emailə göndərildi' });
    } catch (err) {
        res.status(500).json({ message: 'Xəta baş verdi' });
    }
}

export async function resetPassword(req, res) {
    const { email, code, newPassword } = req.body;
    try {
        const user = await findOne({ email });
        if (!user || user.resetCode !== code) {
            return res.status(400).json({ message: 'Kod və ya email səhvdir' });
        }
        user.password = newPassword;
        user.resetCode = undefined;
        await user.save();
        res.json({ message: 'Şifrə uğurla dəyişdirildi' });
    } catch (err) {
        res.status(500).json({ message: 'Xəta baş verdi' });
    }
}
