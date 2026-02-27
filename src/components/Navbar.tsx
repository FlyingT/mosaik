import { Sun, Moon } from 'lucide-react';
import { Logo } from './Logo';

interface NavbarProps {
    isDark: boolean;
    onToggleTheme: () => void;
}

export function Navbar({ isDark, onToggleTheme }: NavbarProps) {
    return (
        <nav className="bg-white dark:bg-[#1e293b] shadow-sm sticky top-0 z-50 transition-colors duration-300 border-b border-gray-100 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center gap-2 font-bold text-xl text-primary">
                        <Logo />
                        <span>Mosaik!</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-xs text-gray-400 dark:text-gray-500 hidden md:block font-medium">
                            Einfacher, lokaler QR-Code Generator
                        </span>
                        <button
                            onClick={onToggleTheme}
                            className="p-2 rounded-lg bg-gray-50 dark:bg-[#0f172a] border border-gray-100 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-all duration-200"
                            title={isDark ? "Hellmodus einschalten" : "Dunkelmodus einschalten"}
                        >
                            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
