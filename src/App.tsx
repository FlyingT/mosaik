import { useState, useCallback } from 'react';
import { useTheme } from './hooks/useTheme';
import { Navbar } from './components/Navbar';
import { ControlPanel, DEFAULT_SETTINGS, type QRSettings } from './components/ControlPanel';
import { QRPreview } from './components/QRPreview';
import { Toast } from './components/Toast';

function App() {
    const { isDark, toggleTheme } = useTheme();
    const [settings, setSettings] = useState<QRSettings>(DEFAULT_SETTINGS);
    const [toast, setToast] = useState({ visible: false, message: '' });

    const version = "v1.5.0";
    const author = "TK";

    const handleReset = () => setSettings(DEFAULT_SETTINGS);

    const handleDownload = useCallback((format: string) => {
        setToast({ visible: true, message: `QR-Code als ${format} heruntergeladen` });
    }, []);

    const hideToast = useCallback(() => {
        setToast(prev => ({ ...prev, visible: false }));
    }, []);

    return (
        <div className="min-h-screen bg-[#f3f4f6] dark:bg-[#0f172a] flex flex-col transition-colors duration-300">
            <Navbar isDark={isDark} onToggleTheme={toggleTheme} />

            <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 flex-grow">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    <ControlPanel
                        settings={settings}
                        onChange={setSettings}
                        onReset={handleReset}
                    />
                    <QRPreview
                        settings={settings}
                        onDownload={handleDownload}
                    />
                </div>
            </main>

            <footer className="w-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-400 text-[10px] sm:text-xs text-right py-1 px-4 sm:px-6 transition-colors duration-300 border-t border-gray-300 dark:border-gray-700">
                <a
                    href="https://github.com/FlyingT/mosaik/blob/main/CHANGELOG.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline transition-colors duration-200"
                >
                    {version} von {author}
                </a>
            </footer>

            <Toast message={toast.message} visible={toast.visible} onClose={hideToast} />
        </div>
    );
}

export default App;
