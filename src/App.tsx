import { useState, useRef } from 'react';
import { QRCodeCanvas, QRCodeSVG } from 'qrcode.react';
import { Download, Type, Palette } from 'lucide-react';

function App() {
    const [text, setText] = useState('');
    const [fgColor, setFgColor] = useState('#000000');
    const [bgColor, setBgColor] = useState('#ffffff');
    const [hasBorder, setHasBorder] = useState(false);
    const [borderThickness, setBorderThickness] = useState(10);
    const [borderColor, setBorderColor] = useState('#374151');
    const [bottomText, setBottomText] = useState('');
    const [textColor, setTextColor] = useState('#000000');

    const version = "v1.2.1";
    const author = "TK";

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
            <rect x="3" y="3" width="7" height="7" rx="1.5" fill="currentColor" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" fill="currentColor" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" fill="currentColor" />
        </svg>
    );

    return (
        <div className="min-h-screen p-4 md:p-8 flex flex-col">
            <header className="max-w-5xl mx-auto mb-8 w-full flex items-center gap-3 text-primary">
                <div className="bg-primary p-2 rounded-lg text-white">
                    <Logo />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 leading-tight">Mosaik!</h1>
                    <p className="text-sm text-gray-500 font-medium">Einfacher, lokaler QR-Code Generator</p>
                </div>
            </header>

            <main className="max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Controls */}
                <div className="lg:col-span-1 flex flex-col gap-6">
                    <div className="card p-6 space-y-4">
                        <h2 className="text-lg font-semibold flex items-center gap-2">
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
                            <div className="flex flex-col gap-3">
                                <input
                                    type="text"
                                    className="input-field"
                                    value={bottomText}
                                    onChange={(e) => setBottomText(e.target.value)}
                                    placeholder="Scan mich!, Hinweis, ..."
                                />
                                {bottomText && (
                                    <div className="flex items-center gap-2 animate-in fade-in duration-200">
                                        <label className="text-xs font-medium text-gray-500 whitespace-nowrap">Textfarbe:</label>
                                        <input
                                            type="color"
                                            className="h-8 w-12 cursor-pointer rounded border border-gray-200"
                                            value={textColor}
                                            onChange={(e) => setTextColor(e.target.value)}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="card p-6 space-y-4">
                        <h2 className="text-lg font-semibold flex items-center gap-2">
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
                        </div>

                        <div className="flex items-center gap-3 pt-2">
                            <input
                                id="border-toggle"
                                type="checkbox"
                                className="w-5 h-5 accent-primary cursor-pointer"
                                checked={hasBorder}
                                onChange={(e) => setHasBorder(e.target.checked)}
                            />
                            <label htmlFor="border-toggle" className="text-sm font-medium text-gray-700 cursor-pointer">
                                Rahmen hinzufügen
                            </label>
                        </div>

                        {hasBorder && (
                            <div className="space-y-4 pt-2 border-t border-gray-100 mt-2 animate-in fade-in slide-in-from-top-2 duration-200">
                                <div>
                                    <label className="label">Rahmendicke ({borderThickness}px)</label>
                                    <input
                                        type="range"
                                        min="1"
                                        max="50"
                                        value={borderThickness}
                                        onChange={(e) => setBorderThickness(Number(e.target.value))}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
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
                    <div className="card p-8 flex flex-col items-center justify-between bg-white relative">
                        <div className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-4">Vorschau</div>

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

                        <div className="mt-12 w-full border-t border-gray-100 pt-8">
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
            </main>

            <footer className="max-w-5xl mx-auto w-full py-6 mt-auto flex justify-end">
                <a
                    href="https://github.com/FlyingT/mosaik/blob/main/CHANGELOG.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-gray-400 hover:text-primary transition-colors duration-200"
                >
                    {version} von {author}
                </a>
            </footer>
        </div>
    );
}

export default App;
