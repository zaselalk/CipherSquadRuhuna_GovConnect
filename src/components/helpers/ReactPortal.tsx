import { useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";


interface ReactPortalProps {
    children: React.ReactNode;
    wrapperId: string;
}

export default function ReactPortal({ children, wrapperId = "react-portal" }: ReactPortalProps) {
    const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(null);
    useLayoutEffect(() => {
        let systemCreated = false;
        let element = document.getElementById(wrapperId);

        if (!element) {
            element = createWrapperAndAppendToBody(wrapperId);
            systemCreated = true;
        }

        setWrapperElement(element);

        // Clean up the wrapper element if the component is unmounted
        return () => {
            if (systemCreated && element?.parentNode) {
                element.parentNode.removeChild(element);
            }
        };
    }, [wrapperId]);

    if (wrapperElement === null) return null;
    return createPortal(children, wrapperElement);
}

function createWrapperAndAppendToBody(wrapperId: string) {
    const wrapperElement = document.createElement("div");
    wrapperElement.setAttribute("id", wrapperId);
    document.body.appendChild(wrapperElement);
    return wrapperElement;
}
