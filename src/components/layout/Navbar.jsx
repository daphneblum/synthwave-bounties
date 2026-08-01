import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import SearchBar from '../feed/SearchBar';
import './Navbar.css';

export default function Navbar({
    searchQuery,
    onSearchChange,
    flickerEnabled,
    onToggleFlicker,
    flickerLocked,
}) {
    const { user,logout } = useAuth();

    return (
        <nav className="navbar">
            <Link to="/" className="wordmark">
                Synthwave<span className="wordmark-accent">Bounties</span>
            </Link>

            {onSearchChange && (
                <SearchBar value={searchQuery} onChange={onSearchChange} />
            )}

            <div className="navbar-right">
                <button 
                    className="flicker-toggle" 
                    onClick={onToggleFlicker} 
                    disabled={flickerLocked} 
                    title={flickerLocked ? 'Disabled by your system reduced-motion setting' : 'Toggle CRT effect'}>
                    CRT FX: {flickerEnabled ? 'ON' : 'OFF'}
                </button>

                {user && (
                    <div className="user-chip">
                        <span className="user-id">@{user.username}</span>
                        <button className="logout-link" onClick={logout}>
                            [logout]
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
}