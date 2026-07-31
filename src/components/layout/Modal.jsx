import { useEffect, useRef } from "react";
import './Modal.css';

export default function Modal({ title, onClose, children }) {
    const panelRef = useRef(null);

    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, [onClose]);

    const handleBackdropClick = (e) => {
        if (panelRef.current && !panelRef.current.contains(e.target)) {
            onClose();
        }
    };

    return (
        <div className="modal-backdrop" onMouseDown={handleBackdropClick}>
            <div
                className="modal-panel terminal-window"
                ref={panelRef}
                role="dialog"
                aria-modal="true"
                aria-label={title}
            >
                <div className="terminal-titlebar">
                    <span>{title}</span>
                    <button
                        className="modal-close"
                        onClick={onClose}
                        aria-label="Close dialog"
                    >
                        [X]
                    </button>
                </div>
                <div className="modal-body">{children}</div>
            </div>
        </div>
    );
}