import mongoose from 'mongoose';
import { DB_PASSWORD, DB_URL, PORT } from '../config/config';

const connectToDB = () => {
    const dbURI = DB_URL.replace('<db_password>', encodeURIComponent(DB_PASSWORD));

    mongoose.connect(dbURI)
        .then(() => {
            console.log('✅ MongoDB connected successfully');
            // Burada `app` obyekti yaratmaq və onu dinləmək lazımdır.
            app.listen(PORT, () => {
                console.log(`🚀 Server is running at http://localhost:${PORT}`);
            });
        })
        .catch((err) => {
            console.error('❌ Mongo connection error:', err);
        });
};

export default connectToDB;
