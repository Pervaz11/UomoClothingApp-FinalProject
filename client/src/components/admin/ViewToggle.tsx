import { FaTh, FaList } from "react-icons/fa";

type Props = {
    view: "grid" | "list";
    setView: (v: "grid" | "list") => void;
};

export default function ViewToggle({ view, setView }: Props) {
    return (
        <div className="flex gap-2">
            <button
                onClick={() => setView("grid")}
                className={`p-2 rounded-md ${view === "grid" ? "bg-indigo-600 text-white" : "bg-gray-200"
                    }`}
            >
                <FaTh />
            </button>
            <button
                onClick={() => setView("list")}
                className={`p-2 rounded-md ${view === "list" ? "bg-indigo-600 text-white" : "bg-gray-200"
                    }`}
            >
                <FaList />
            </button>
        </div>
    );
}
