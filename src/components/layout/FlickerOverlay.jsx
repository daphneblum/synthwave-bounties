import './FlickerOverlay.css';

export default function FlickerOverlay({ active }) {
    return (
        <div className='flicker-overlay' aria-hidden="true">
            <div className='scanlines' />
            {active && <div className='flicker-layer' />}
        </div>
    );
}