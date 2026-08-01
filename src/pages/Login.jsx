import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import './Login.css';

export default function Login() {
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const { claimUsername } = useAuth();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');
        const result = await claimUsername(username);
        setIsSubmitting(false);
        if (result.error) {
            setError(result.error);
            return;
        }
        navigate('/');
    };

    return (
        <div className="login-page">
            {/*placeolder*/}
            <video className="login-video" autoPlay loop muted playsInline>
                <source src="/media/login-loop.mp4" type="video/mp4" />
            </video>
            <div className="login-video-scrim" />

            <div className="login-content">
                <h1 className="login-title">
                    SYNTHWAVE<span className="login-title-accent">BOUNTIES</span>
                </h1>
                <p className="login-subtitle">a bounty board for the terminally curious</p>

                <form className="login-form" onSubmit={handleSubmit}>
                    {error && <div className="login-error">! {error}</div>}
                    <label htmlFor="username" className="visually-hidden">Username</label>
                    <input 
                        id="username"
                        type="text" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="ENTER USER ID"
                        autoFocus
                        disabled={isSubmitting}
                    />
                    <button type="submit" className="btn magenta login-submit" disabled={isSubmitting}>
                        [{isSubmitting ? 'CONNECTING...' : 'CONNECT'}]
                    </button>
                </form>
                <p className="login-hint">
                    new ID? one will be claimed automatically. returning? enter your existing ID to reconnect. 
                </p>
            </div>
        </div>
    );
}