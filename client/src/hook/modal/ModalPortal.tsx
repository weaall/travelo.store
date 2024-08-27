import { ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";

interface ModalPortalProps {
    children: ReactNode;
}

export const ModalPortal = ({ children }: ModalPortalProps) => {
    const modalRoot = document.getElementById("modal-root") as HTMLElement;

    useEffect(() => {
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    return ReactDOM.createPortal(children, modalRoot);
};