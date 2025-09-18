import TitleBanner from "../../../components/TitleBanner";
import userimage from "../../../assets/images/4a0cd7d28ecab48c1697f48a918ee5a44e70bfe5b605752d482b33186745e95d.jpg";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const UserDashboard = () => {
    const user = useSelector((state: RootState) => state.user);
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { t } = useTranslation();

    useEffect(() => {
        const fetchBookings = async () => {
            setLoading(true);
            setError("");
            try {
                const res = await fetch(`http://localhost:3000/api/bookings/user/${user.id}`);
                if (!res.ok) throw new Error("Booking-lər tapılmadı");
                const data = await res.json();
                setBookings(data.bookings || []);
            } catch (err: any) {
                setError(err.message || "Xəta baş verdi");
            } finally {
                setLoading(false);
            }
        };
        if (user.id) fetchBookings();
    }, [user.id]);

    return (
        <>
            <TitleBanner title={t('user_dashboard')} />
            <section>
                <div className="">
                    <div className="right   border-amber-500 px-10 py-15">
                        <div className="shadow-xl   px-5 py-7 border-[#e9e9e9] ">
                            <div className=" flex justify-between  border-[#e8e8e8] border-b-2 pb-2">
                                <h2 className="text-[#234076] font-semibold cursor-pointer">{t('my_profile')}</h2>
                                <div className="flex gap-4">
                                    <Link to="/edituser" className="text-[#9e9e9e] cursor-pointer">{t('edit_profile')}</Link>
                                </div>
                            </div>
                            <div className=" py-10 flex  gap-2 justify-around  ">
                                <div className="flex gap-9 ">
                                    <div className="flex flex-col">
                                        <img src={user.profileImage || userimage} className="w-[150px] rounded-full object-cover" alt="Profile" />
                                    </div>
                                    <div className="flex gap-9">
                                        <div className="text-[#545454]">
                                            <ul className="flex flex-col gap-3">
                                                <li>{t('name')}</li>
                                                <li>{t('email')}</li>
                                                <li>{t('username')}</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <ul className="flex flex-col gap-3 font-semibold">
                                                <li>{user.fullName || '-'}</li>
                                                <li>{user.email || '-'}</li>
                                                <li>{user.username || '-'}</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-9">
                                    <div className="text-[#545454]">
                                        <ul className="flex flex-col gap-3 ">
                                            <li>{t('role')}</li>
                                            <li>{t('phone')}</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <ul className="flex flex-col gap-3 font-semibold">
                                            <li>{user.role || '-'}</li>
                                            <li>{user.phoneNumber || '-'}</li>
                                        </ul>
                                    </div>
                                    {user.role === "admin" && (
                                        <Link
                                            to="/admin/"
                                            className="bg-blue-600 text-white p-2 flex items-center h-10 rounded-lg font-semibold hover:bg-blue-700 transition"
                                        >
                                            {t('admin_panel')}
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Booking Table */}
            <section className="mt-10">
                <div className="w-full max-w-5xl bg-white rounded-lg shadow-lg p-8 m-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-[#234076]">{t('current_booking')}</h2>
                        <span className="text-gray-400 cursor-default text-sm font-semibold">{t('view_all_bookings')}</span>
                    </div>
                    {loading ? (
                        <div className="text-center py-6">{t('loading')}</div>
                    ) : error ? (
                        <div className="text-center text-red-500 py-6">{error}</div>
                    ) : (
                        <table className="w-full text-left border-separate border-spacing-y-4">
                            <thead>
                                <tr className="text-gray-500 text-base">
                                    <th>{t('tour_name')}</th>
                                    <th>{t('travel_date')}</th>
                                    <th>{t('total')}</th>
                                    <th>{t('payment_status')}</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.length === 0 ? (
                                    <tr><td colSpan={5} className="text-center py-4">{t('no_bookings_found')}</td></tr>
                                ) : (
                                    bookings.map((b) => (
                                        <tr key={b._id} className="bg-white">
                                            <td className="text-[#234076] font-semibold underline cursor-pointer">{b.tourName || b.tour?.title || '-'}</td>
                                            <td>{b.travelDate ? new Date(b.travelDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : '-'}</td>
                                            <td className="font-bold text-lg">${b.total?.toLocaleString(undefined, { minimumFractionDigits: 2 }) || '-'}</td>
                                            <td className={b.paymentStatus === "Pending" ? "text-green-600 font-semibold" : "text-gray-700"}>{b.paymentStatus || '-'}</td>
                                            <td className="flex gap-2">
                                                <button className="bg-[#234076] text-white rounded p-2" title={t('pay_now')}>
                                                    <span className="text-lg">$</span>
                                                </button>
                                                <button className="bg-[#234076] text-white rounded p-2" title={t('cancel')}>
                                                    <span className="text-lg">×</span>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </section>
        </>
    );
};

export default UserDashboard;
