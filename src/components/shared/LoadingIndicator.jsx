import './LoadingIndicator.css';

export default function LoadingIndicator({ label = 'LOADING' }) {
    return (
        <div>
            <span>{label}</span>
            <span className='loading-dots'>
                <span>.</span>
                <span>.</span>
                <span>.</span>
            </span>
            <span className='loading-cursor'>_</span>
        </div>
    );
}