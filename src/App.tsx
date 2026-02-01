import { useState, useRef, useEffect } from 'react';
import { QRCodeCanvas, QRCodeSVG } from 'qrcode.react';
import { Download, Type, Palette, Sun, Moon } from 'lucide-react';

function App() {
    const [text, setText] = useState('');
    const [fgColor, setFgColor] = useState('#000000');
    const [bgColor, setBgColor] = useState('#ffffff');
    const [hasBorder, setHasBorder] = useState(false);
    const [borderThickness, setBorderThickness] = useState(10);
    const [borderColor, setBorderColor] = useState('#374151');
    const [bottomText, setBottomText] = useState('');
    const [textColor, setTextColor] = useState('#000000');
    const [isDark, setIsDark] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('theme');
            if (saved) return saved === 'dark';
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        return false;
    });

    const version = "v1.4.1";
    const author = "TK";

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    const qrRef = useRef<HTMLDivElement>(null);

    const downloadQR = (format: 'png' | 'jpg' | 'svg') => {
        if (!qrRef.current) return;

        if (format === 'svg') {
            const svg = qrRef.current.querySelector('svg');
            if (svg) {
                const svgData = new XMLSerializer().serializeToString(svg);
                const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
                const svgUrl = URL.createObjectURL(svgBlob);
                const downloadLink = document.createElement('a');
                downloadLink.href = svgUrl;
                downloadLink.download = `qrcode_${Date.now()}.svg`;
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
            }
            return;
        }

        const canvas = qrRef.current.querySelector('canvas');
        if (canvas) {
            // Create a temporary canvas to include border and text
            const tempCanvas = document.createElement('canvas');
            const ctx = tempCanvas.getContext('2d');
            if (!ctx) return;

            const borderPadding = hasBorder ? Number(borderThickness) : 0;
            const innerPadding = 10; // Corresponds to the p-2 in preview
            const totalPadding = borderPadding + innerPadding;
            const textSpace = bottomText ? 60 : 0;

            tempCanvas.width = canvas.width + totalPadding * 2;
            tempCanvas.height = canvas.height + totalPadding * 2 + textSpace;

            // 1. Background / Border color
            ctx.fillStyle = hasBorder ? borderColor : (format === 'jpg' ? '#ffffff' : 'transparent');
            if (format === 'png' && !hasBorder) {
                ctx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
            } else {
                ctx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
            }

            // 2. QR Background Box
            ctx.fillStyle = bgColor;
            ctx.fillRect(borderPadding, borderPadding, canvas.width + innerPadding * 2, canvas.height + innerPadding * 2 + textSpace);

            // 3. Draw QR Code
            ctx.drawImage(canvas, totalPadding, totalPadding);

            // 4. Draw Label text
            if (bottomText) {
                ctx.fillStyle = textColor;
                ctx.font = 'bold 20px Inter, sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText(bottomText, tempCanvas.width / 2, canvas.height + totalPadding + 40);
            }

            const url = tempCanvas.toDataURL(`image/${format === 'jpg' ? 'jpeg' : 'png'}`, 1.0);
            const link = document.createElement('a');
            link.download = `qrcode_${Date.now()}.${format}`;
            link.href = url;
            link.click();
        }
    };

    const Logo = () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="2" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="2.5" />
            <rect x="6" y="6" width="5" height="5" rx="1" fill="currentColor" />
            <rect x="13" y="6" width="5" height="5" rx="1" fill="currentColor" />
            <rect x="6" y="13" width="5" height="5" rx="1" fill="currentColor" />
        </svg>
    );

    return (
        <div className="min-h-screen bg-[#f3f4f6] dark:bg-[#0f172a] flex flex-col transition-colors duration-300">
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
                                onClick={() => setIsDark(!isDark)}
                                className="p-2 rounded-lg bg-gray-50 dark:bg-[#0f172a] border border-gray-100 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-all duration-200"
                                title={isDark ? "Hellmodus einschalten" : "Dunkelmodus einschalten"}
                            >
                                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 flex-grow">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* Controls */}
                    <div className="lg:col-span-1 flex flex-col gap-6">
                        <div className="card p-6 space-y-4">
                            <h2 className="text-lg font-semibold flex items-center gap-2 dark:text-white">
                                <Type className="w-5 h-5 text-primary" />
                                Inhalt & Text
                            </h2>

                            <div>
                                <label className="label">QR-Code Inhalt</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    placeholder="Link, Text, ..."
                                />
                            </div>

                            <div>
                                <label className="label">Beschriftung</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    value={bottomText}
                                    onChange={(e) => setBottomText(e.target.value)}
                                    placeholder="Scan mich!, Hinweis, ..."
                                />
                            </div>
                        </div>

                        <div className="card p-6 space-y-4">
                            <h2 className="text-lg font-semibold flex items-center gap-2 dark:text-white">
                                <Palette className="w-5 h-5 text-primary" />
                                Farben & Design
                            </h2>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="label">QR Farbe</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="color"
                                            className="h-10 w-full cursor-pointer rounded border border-gray-200"
                                            value={fgColor}
                                            onChange={(e) => setFgColor(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="label">Hintergrund</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="color"
                                            className="h-10 w-full cursor-pointer rounded border border-gray-200"
                                            value={bgColor}
                                            onChange={(e) => setBgColor(e.target.value)}
                                        />
                                    </div>
                                </div>
                                {bottomText && (
                                    <div className="col-span-2 animate-in fade-in duration-300">
                                        <label className="label">Text Farbe</label>
                                        <input
                                            type="color"
                                            className="h-10 w-full cursor-pointer rounded border border-gray-200"
                                            value={textColor}
                                            onChange={(e) => setTextColor(e.target.value)}
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center gap-3 pt-2">
                                <input
                                    id="border-toggle"
                                    type="checkbox"
                                    className="w-5 h-5 accent-primary cursor-pointer"
                                    checked={hasBorder}
                                    onChange={(e) => setHasBorder(e.target.checked)}
                                />
                                <label htmlFor="border-toggle" className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
                                    Rahmen hinzufügen
                                </label>
                            </div>

                            {hasBorder && (
                                <div className="space-y-4 pt-2 border-t border-gray-100 dark:border-gray-800 mt-2 animate-in fade-in slide-in-from-top-2 duration-200">
                                    <div>
                                        <label className="label">Rahmendicke ({borderThickness}px)</label>
                                        <input
                                            type="range"
                                            min="1"
                                            max="50"
                                            value={borderThickness}
                                            onChange={(e) => setBorderThickness(Number(e.target.value))}
                                            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
                                        />
                                    </div>
                                    <div>
                                        <label className="label">Rahmenfarbe</label>
                                        <input
                                            type="color"
                                            className="h-10 w-full cursor-pointer rounded border border-gray-200"
                                            value={borderColor}
                                            onChange={(e) => setBorderColor(e.target.value)}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Preview */}
                    <div className="lg:col-span-2 flex flex-col">
                        <div className="card p-8 flex flex-col items-center justify-between bg-white dark:bg-[#1e293b] relative">
                            <div className="text-sm font-medium text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">Vorschau</div>

                            <div className="flex-grow flex items-center justify-center w-full">
                                <div
                                    ref={qrRef}
                                    className={`transition-all duration-300 flex flex-col items-center justify-center`}
                                    style={{
                                        backgroundColor: hasBorder ? borderColor : 'transparent',
                                        padding: hasBorder ? `${borderThickness}px` : '0',
                                        borderRadius: '0.75rem',
                                        boxShadow: hasBorder ? '0 10px 15px -3px rgb(0 0 0 / 0.1)' : 'none'
                                    }}
                                >
                                    <div
                                        className="flex flex-col items-center p-2 rounded shadow-sm"
                                        style={{ backgroundColor: bgColor }}
                                    >
                                        <div className="hidden">
                                            <QRCodeCanvas
                                                value={text || ' '}
                                                size={320}
                                                fgColor={fgColor}
                                                bgColor={bgColor}
                                                level="H"
                                            />
                                        </div>
                                        <QRCodeSVG
                                            value={text || ' '}
                                            size={320}
                                            fgColor={fgColor}
                                            bgColor={bgColor}
                                            level="H"
                                            className="max-w-full h-auto"
                                        />
                                        {bottomText && (
                                            <div
                                                className="mt-6 font-bold text-xl"
                                                style={{ color: textColor }}
                                            >
                                                {bottomText}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 w-full border-t border-gray-100 dark:border-gray-800 pt-8">
                                <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                                    <button disabled={!text} onClick={() => downloadQR('png')} className="btn-primary flex items-center justify-center gap-2 w-full md:w-auto">
                                        <Download className="w-4 h-4" /> PNG
                                    </button>
                                    <button disabled={!text} onClick={() => downloadQR('jpg')} className="btn-primary bg-primary-light hover:bg-primary flex items-center justify-center gap-2 w-full md:w-auto">
                                        <Download className="w-4 h-4" /> JPG
                                    </button>
                                    <button disabled={!text} onClick={() => downloadQR('svg')} className="btn-primary bg-gray-600 hover:bg-gray-700 flex items-center justify-center gap-2 w-full md:w-auto">
                                        <Download className="w-4 h-4" /> SVG
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
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
        </div>
    );
}

export default App;
