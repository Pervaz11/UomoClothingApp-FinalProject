import { useState, useEffect } from "react";

const TimerUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center bg-white shadow rounded-lg px-4 py-2 w-[70px] sm:w-[90px]">
        <div className="text-2xl sm:text-4xl font-bold text-gray-800">
            {value.toString().padStart(2, "0")}
        </div>
        <div className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide">
            {label}
        </div>
    </div>
);

const CountdownTimer = () => {
    const calculateTimeLeft = () => {
        const targetDate = new Date("2025-07-20T00:00:00");
        const now = new Date();
        const difference = targetDate.getTime() - now.getTime();

        return difference > 0
            ? {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            }
            : { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="flex m-6 gap-3 sm:gap-6 flex-wrap justify-center">
            <TimerUnit value={timeLeft.days} label="Days" />
            <TimerUnit value={timeLeft.hours} label="Hours" />
            <TimerUnit value={timeLeft.minutes} label="Mins" />
            <TimerUnit value={timeLeft.seconds} label="Secs" />
        </div>
    );
};

export default CountdownTimer;
