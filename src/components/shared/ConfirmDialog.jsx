import Modal from '../layout/Modal';
import './ConfirmDialog.css';

export default function ConfirmDialog({
    title = 'CONFIRM_ACTION.EXE',
    message,
    confirmLabel = 'CONFIRM',
    cancelLabel = 'ABORT',
    onConfirm,
    onCancel,
}) {
    return (
        <Modal title={title} onClose={onCancel}>
            <p className='confirm-message'></p>
            <div className='confirm-actions'>
                <button className='btn danger' onClick={onConfirm}>
                    [{confirmLabel}]
                </button>
                <button className='btn' onClick={onCancel}>
                    [{cancelLabel}]
                </button>
            </div>
        </Modal>
    );
}