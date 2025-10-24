import { useState } from "react";
import { forgotPassword } from "../../api/userApi";
import { useSnackbar } from "notistack";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await forgotPassword(email);
            enqueueSnackbar(res.message, { variant: "success" });
        } catch (error: any) {
            enqueueSnackbar(error?.message || "Xəta baş verdi", { variant: "error" });
        }
    };

    return (
        // Bütün səhifənin mərkəzləşdirilməsi və fon rəngi
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">

            {/* Kart (Konteyner) Stili: Kölgə, yumru künclər və ağ fon */}
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-2xl transition duration-500 ease-in-out transform hover:shadow-xl">

                {/* Başlıq hissəsi */}
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Şifrəni unutmusunuz?</h2>
                    <p className="text-sm text-gray-500">
                        Qeydiyyatdan keçdiyiniz <span className="font-semibold text-blue-600">email adresinizi</span> daxil edin.
                    </p>
                </div>

                {/* Form stili */}
                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Daxiletmə sahəsi (Input) stili */}
                    <div>
                        <label htmlFor="email" className="sr-only">Email ünvanı</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="nümunə@email.com"
                            required
                            className="
                appearance-none relative block w-full px-3 py-3 border 
                border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg 
                focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm
                transition duration-150 ease-in-out
              "
                        />
                    </div>

                    {/* Düymə stili */}
                    <button
                        type="submit"
                        className="
              group relative w-full flex justify-center py-3 px-4 border border-transparent 
              text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
              transition duration-150 ease-in-out transform hover:scale-[1.01]
            "
                    >
                        Şifrəni yenilə
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
