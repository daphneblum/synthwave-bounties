import './FlickerOverlay.css';

export default function FlickerOverlay({ active }) {
  if (!active) return null;

  return (
    <div className="flicker-overlay" aria-hidden="true">
        <div className="scanlines" />
        <div className="crt-vignette" />
        <div className="crt-roll" />
    </div>
  );
}