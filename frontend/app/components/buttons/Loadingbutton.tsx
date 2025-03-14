import React from "react";

interface LoadingButtonProps {
    loading: boolean;
    text: string;
    loadingText?: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    className?: string;
    color?: string; // Accept custom colors (default: "bg-blue-600")
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
    loading,
    text,
    loadingText = "Loading...",
    onClick,
    type = "button",
    className = "",
    color = "bg-blue-600"
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`${color} text-white w-full p-2 rounded-md flex items-center justify-center transition-all duration-200 ease-in-out
                ${loading ? 'opacity-75 cursor-not-allowed' : 'hover:bg-opacity-90'} ${className}`}
            disabled={loading}
        >
            {loading ? (
                <div className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                    </svg>
                    {loadingText}
                </div>
            ) : (
                text
            )}
        </button>
    );
};

export default LoadingButton;
