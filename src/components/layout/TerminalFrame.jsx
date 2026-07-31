import './TerminalFrame.css';

export default function TerminalFrame({ title, children }) {
    return (
        <div className='terminal-frame terminal-winddow'>
            <div className='terminal-titlebar'>
                <span>{title}</span>
                <div className='dots'>
                    <span />
                    <span />
                    <span />
                </div>
            </div>
            <div className='terminal-body'>{children}</div>
        </div>
    );
}