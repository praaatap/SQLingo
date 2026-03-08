import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Problems from './pages/problems/ProblemsPage';
import ProblemDetail from './pages/problems/ProblemDetail';
import { NavigationTracker } from './components/navigation-tracker';
import { PWAInstallPrompt } from './components/pwa-install-prompt';

function App() {
    return (
        <Router>
            <NavigationTracker />
            <div className="min-h-screen bg-background text-foreground antialiased font-sans">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/problems" element={<Problems />} />
                    <Route path="/problems/:id" element={<ProblemDetail />} />
                </Routes>
            </div>
            <PWAInstallPrompt />
        </Router>
    );
}

export default App;
