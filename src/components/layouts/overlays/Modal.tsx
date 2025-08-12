import React, { FC } from "react";
import ReactPortal from "../../helpers/ReactPortal";
import { IoMdCloseCircle } from "react-icons/io";


interface ModalProps {
    children: React.ReactNode,
    isOpen: boolean,
    handleClose: () => void,
    title: string

}

interface ModalProps {
    isOpen: boolean;
    title: string;
    children: React.ReactNode;
    onClose?: () => void; // Added onClose property
}
const Modal: FC<ModalProps> = ({ children, isOpen, handleClose, title }) => {
    React.useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => (e.key === "Escape" ? handleClose() : null);
        document.body.addEventListener("keydown", handleEscape);
        return () => {
            document.body.removeEventListener("keydown", handleEscape);
        };
    }, [handleClose]);

    if (!isOpen) return null;
    return (
        <ReactPortal wrapperId="overlay-root">
            <div className="fixed inset-0 bg-slate-100/[0.9] md:bg-slate-100/[0.5] flex items-center justify-center z-50  ">
                <div className="bg-white rounded-md w-5/6 border-2 border-bblue shadow-sm">
                    <div className="flex justify-between items-center p-5 ">
                        {title}
                        <button
                            onClick={handleClose}
                            className="bg-slate-200 hover:bg-slate-300  rounded-full cursor-pointer"
                        >
                            <IoMdCloseCircle size={32} />
                        </button>
                    </div>
                    {children}
                </div>
            </div>
        </ReactPortal>
    );
};

export default React.memo(Modal);