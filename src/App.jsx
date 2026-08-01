import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import AuthGate from './components/shared/AuthGate';
import Login from './pages/Login';
import Feed from './pages/Feed';
import PostDetailPage from './pages/PostDetailPage';
import { FlickerProvider, useFlickerPreference } from './hooks/useFlickerPreference';
import FlickerOverlay from './components/layout/FlickerOverlay';


function AppShell() {
    const { flickerActive } = useFlickerPreference();

    return (
        <>
            <FlickerOverlay active={flickerActive} />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<AuthGate><Feed /></AuthGate>} />
                <Route path="/post/:id" element={<AuthGate><PostDetailPage /></AuthGate>} />
            </Routes>
        </>
    );
}

export default function App() {
    return (
        <AuthProvider>
            <FlickerProvider>
                <BrowserRouter>
                    <AppShell />
                </BrowserRouter>
            </FlickerProvider>
        </AuthProvider>
    );
}