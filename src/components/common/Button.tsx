import { FC } from "react"

// prop types
interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    type?: "button" | "submit" | "reset";
}

export const Button: FC<ButtonProps> = ({ onClick, disabled, className, type = "button", children }) => {
    let buttonClass = `bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:shadow-lg 
    transition duration-300 ease-in-out flex justify-center items-center cursor-pointer`;
    if (className) {
        buttonClass += ` ${className}`;
    }
    return (
        <button className={buttonClass}
            onClick={onClick}
            type={type}
            disabled={disabled}> {children}</button>
    )
}
