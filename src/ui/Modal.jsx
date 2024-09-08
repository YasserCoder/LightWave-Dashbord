import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import { useOutsideClick } from "../hook/useOutsideClick";

const ModalContext = createContext();

function Modal({ children }) {
    const [openName, setOpenName] = useState("");

    const close = () => setOpenName("");
    const open = setOpenName;

    return (
        <ModalContext.Provider value={{ openName, close, open }}>
            {children}
        </ModalContext.Provider>
    );
}

function Open({ children, opens: opensWindowName }) {
    const { open } = useContext(ModalContext);

    return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name }) {
    const { openName, close } = useContext(ModalContext);
    const ref = useOutsideClick(close);

    if (name !== openName) return null;

    return createPortal(
        <div className="fixed left-0 top-0 w-full h-screen bg-slate-300 bg-opacity-15 backdrop-blur-sm duration-500 z-50">
            <div
                className="fixed left-1/2 top-1/2 w-[80%] -translate-x-1/2 -translate-y-1/2 py-3 px-4 bg-bkg-main shadow-lg rounded-lg duration-500"
                ref={ref}
            >
                <button onClick={close}>
                    <HiXMark />
                </button>

                <div>{cloneElement(children, { onClose: close })}</div>
            </div>
        </div>,
        document.body
    );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;