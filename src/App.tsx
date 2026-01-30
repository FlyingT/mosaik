import { useState, useRef } from 'react';
import { QRCodeCanvas, QRCodeSVG } from 'qrcode.react';
import { Download, LayoutGrid, Type, Palette } from 'lucide-react';

function App() {
    const [text, setText] = useState('');
    const [fgColor, setFgColor] = useState('#4f46e5');
    const [bgColor, setBgColor] = useState('#ffffff');
    const [hasBorder, setHasBorder] = useState(true);
    const [bottomText, setBottomText] = useState('');

    const version = "v1.0.1";
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

            const padding = hasBorder ? 40 : 20;
            const textHeight = bottomText ? 40 : 0;

            tempCanvas.width = canvas.width + padding * 2;
            tempCanvas.height = canvas.height + padding * 2 + textHeight;

            // Fill background
            ctx.fillStyle = bgColor;
            ctx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

            // Draw QR Code
            ctx.drawImage(canvas, padding, padding);

            // Draw optional text
            if (bottomText) {
                ctx.fillStyle = fgColor;
                ctx.font = 'bold 16px Inter, sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText(bottomText, tempCanvas.width / 2, canvas.height + padding + textHeight / 2 + 5);
            }

            const url = tempCanvas.toDataURL(`image/${format === 'jpg' ? 'jpeg' : 'png'}`);
            const link = document.createElement('a');
            link.download = `qrcode_${Date.now()}.${format}`;
            link.href = url;
            link.click();
        }
    };

    return (
        <div className="min-h-screen p-4 md:p-8">
            <header className="max-w-5xl mx-auto mb-8 flex items-center gap-3">
                <div className="bg-primary p-2 rounded-lg">
                    <LayoutGrid className="text-white w-6 h-6" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 leading-tight">Mosaik!</h1>
                    <p className="text-sm text-gray-500 font-medium">Einfacher, lokaler QR-Code Generator</p>
                </div>
            </header>

            <main className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Controls */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="card p-6 space-y-4">
                        <h2 className="text-lg font-semibold flex items-center gap-2">
                            <Type className="w-5 h-5 text-primary" />
                            Inhalt & Text
                        </h2>

                        <div>
                            <label className="label">QR-Code Inhalt (URL/Text)</label>
                            <input
                                type="text"
                                className="input-field"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder="Inhalt hier eingeben..."
                            />
                        </div>

                        <div>
                            <label className="label">Text unter dem Code</label>
                            <input
                                type="text"
                                className="input-field"
                                value={bottomText}
                                onChange={(e) => setBottomText(e.target.value)}
                                placeholder="Optionaler Text"
                            />
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

                        <div className="flex items-center gap-3 py-2">
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
                    </div>

                    <div className="card p-6 space-y-4">
                        <h2 className="text-lg font-semibold flex items-center gap-2">
                            <Download className="w-5 h-5 text-primary" />
                            Herunterladen
                        </h2>
                        <div className="grid grid-cols-1 gap-3">
                            <button disabled={!text} onClick={() => downloadQR('png')} className="btn-primary flex items-center justify-center gap-2">
                                <Download className="w-4 h-4" /> PNG laden
                            </button>
                            <button disabled={!text} onClick={() => downloadQR('jpg')} className="btn-primary bg-primary-light hover:bg-primary flex items-center justify-center gap-2">
                                <Download className="w-4 h-4" /> JPG laden
                            </button>
                            <button disabled={!text} onClick={() => downloadQR('svg')} className="btn-primary bg-gray-600 hover:bg-gray-700 flex items-center justify-center gap-2">
                                <Download className="w-4 h-4" /> SVG laden
                            </button>
                        </div>
                    </div>
                </div>

                {/* Preview */}
                <div className="lg:col-span-2">
                    <div className="card p-8 flex flex-col items-center justify-center min-h-[400px] bg-white">
                        <div className="mb-4 text-sm font-medium text-gray-400 uppercase tracking-widest">Vorschau</div>
                        <div
                            ref={qrRef}
                            className={`transition-all duration-300 flex flex-col items-center justify-center`}
                            style={{
                                backgroundColor: bgColor,
                                padding: hasBorder ? '2rem' : '1rem',
                                borderRadius: '0.5rem',
                                boxShadow: hasBorder ? '0 10px 15px -3px rgb(0 0 0 / 0.1)' : 'none'
                            }}
                        >
                            <div className="hidden">
                                <QRCodeCanvas
                                    value={text || ' '}
                                    size={256}
                                    fgColor={fgColor}
                                    bgColor={bgColor}
                                    level="H"
                                />
                            </div>
                            <QRCodeSVG
                                value={text || ' '}
                                size={256}
                                fgColor={fgColor}
                                bgColor={bgColor}
                                level="H"
                            />
                            {bottomText && (
                                <div
                                    className="mt-4 font-bold text-lg"
                                    style={{ color: fgColor }}
                                >
                                    {bottomText}
                                </div>
                            )}
                        </div>

                        <div className="mt-12 w-full border-t border-gray-100 pt-8">
                            <div className="flex items-center gap-4 text-gray-500">
                                <div className="bg-primary/10 p-2 rounded-full">
                                    <LayoutGrid className="text-primary w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">QR-Code Informationen</h3>
                                    <p className="text-sm">Inhalt: {text || 'Kein Inhalt angegeben'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="max-w-5xl mx-auto w-full py-6 mt-auto flex justify-end">
                <a
                    href="CHANGELOG.md"
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
