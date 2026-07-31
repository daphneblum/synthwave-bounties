import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import AuthGate from './components/shared/AuthGate';
import Login from './pages/Login';
import Feed from './pages/Feed';
import PostDetailPage from './pages/PostDetail';
import FlickerOverlay from './components/layout/FlickerOverlay';
import { useFlickerPreference } from './hooks/useFlickerPreference';

function AppShell() {
    const { flickerActive } = useFlickerPreference();

    return (
        <>
            <FlickerOverlay active={flickerActive} />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/post/:id" element={<AuthGate><Feed /></AuthGate>} />
                <Route path="/post/:id" element={<AuthGate><PostDetailPage /></AuthGate>} />
            </Routes>
        </>
    );
}

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <AppShell />
            </BrowserRouter>
        </AuthProvider>
    )
}