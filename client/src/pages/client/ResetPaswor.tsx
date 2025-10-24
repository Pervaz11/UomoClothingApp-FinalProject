import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const API_URL = "http://localhost:5050/";

const ResetPassword = () => {
    const { token } = useParams();
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}auth/reset-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ newPassword, token }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Şifrə yenilənmədi");
            enqueueSnackbar(data.message, { variant: "success" });
            setTimeout(() => navigate("/login"), 1500);
        } catch (error: any) {
            enqueueSnackbar(error?.message || "Xəta baş verdi", { variant: "error" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm mx-auto mt-10">
            <input
                type="password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                placeholder="Yeni şifrə"
                required
                className="border px-4 py-2 rounded"
            />
            <button type="submit" disabled={loading} className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                Şifrəni yenilə
            </button>
        </form>
    );
};

export default ResetPassword;
