import { useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';

interface ToastProps {
    message: string;
    visible: boolean;
    onClose: () => void;
}

export function Toast({ message, visible, onClose }: ToastProps) {
    useEffect(() => {
        if (visible) {
            const timer = setTimeout(onClose, 2500);
            return () => clearTimeout(timer);
        }
    }, [visible, onClose]);

    if (!visible) return null;

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-center gap-2 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900 text-sm font-medium px-5 py-3 rounded-xl shadow-lg">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
                {message}
            </div>
        </div>
    );
}
