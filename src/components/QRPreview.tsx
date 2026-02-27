import { useRef, useCallback } from 'react';
import { QRCodeCanvas, QRCodeSVG } from 'qrcode.react';
import { Download } from 'lucide-react';
import { type QRSettings } from './ControlPanel';

interface QRPreviewProps {
    settings: QRSettings;
    onDownload: (format: string) => void;
}

export function QRPreview({ settings, onDownload }: QRPreviewProps) {
    const { text, fgColor, bgColor, hasBorder, borderThickness, borderColor, bottomText, textColor } = settings;
    const qrRef = useRef<HTMLDivElement>(null);

    const downloadQR = useCallback((format: 'png' | 'jpg' | 'svg') => {
        if (!qrRef.current) return;

        if (format === 'svg') {
            downloadSVG();
            onDownload('SVG');
            return;
        }

        downloadRaster(format);
        onDownload(format.toUpperCase());
    }, [settings]);

    const downloadSVG = () => {
        if (!qrRef.current) return;
        const svgEl = qrRef.current.querySelector('svg');
        if (!svgEl) return;

        const svgClone = svgEl.cloneNode(true) as SVGSVGElement;
        const qrSize = 320;
        const innerPadding = 10;
        const borderPad = hasBorder ? Number(borderThickness) : 0;
        const totalPadding = borderPad + innerPadding;
        const textSpace = bottomText ? 60 : 0;
        const totalWidth = qrSize + totalPadding * 2;
        const totalHeight = qrSize + totalPadding * 2 + textSpace;

        // Build composite SVG
        const ns = 'http://www.w3.org/2000/svg';
        const compositeSvg = document.createElementNS(ns, 'svg');
        compositeSvg.setAttribute('xmlns', ns);
        compositeSvg.setAttribute('width', String(totalWidth));
        compositeSvg.setAttribute('height', String(totalHeight));
        compositeSvg.setAttribute('viewBox', `0 0 ${totalWidth} ${totalHeight}`);

        // Border background
        if (hasBorder) {
            const borderRect = document.createElementNS(ns, 'rect');
            borderRect.setAttribute('width', String(totalWidth));
            borderRect.setAttribute('height', String(totalHeight));
            borderRect.setAttribute('fill', borderColor);
            borderRect.setAttribute('rx', '12');
            compositeSvg.appendChild(borderRect);
        }

        // QR background box
        const bgRect = document.createElementNS(ns, 'rect');
        bgRect.setAttribute('x', String(borderPad));
        bgRect.setAttribute('y', String(borderPad));
        bgRect.setAttribute('width', String(qrSize + innerPadding * 2));
        bgRect.setAttribute('height', String(qrSize + innerPadding * 2 + textSpace));
        bgRect.setAttribute('fill', bgColor);
        compositeSvg.appendChild(bgRect);

        // Embed the QR code SVG
        svgClone.removeAttribute('class');
        svgClone.setAttribute('x', String(totalPadding));
        svgClone.setAttribute('y', String(totalPadding));
        svgClone.setAttribute('width', String(qrSize));
        svgClone.setAttribute('height', String(qrSize));
        compositeSvg.appendChild(svgClone);

        // Label text
        if (bottomText) {
            const textEl = document.createElementNS(ns, 'text');
            textEl.setAttribute('x', String(totalWidth / 2));
            textEl.setAttribute('y', String(qrSize + totalPadding + 40));
            textEl.setAttribute('text-anchor', 'middle');
            textEl.setAttribute('fill', textColor);
            textEl.setAttribute('font-family', 'Inter, sans-serif');
            textEl.setAttribute('font-weight', 'bold');
            textEl.setAttribute('font-size', '20');
            textEl.textContent = bottomText;
            compositeSvg.appendChild(textEl);
        }

        const svgData = new XMLSerializer().serializeToString(compositeSvg);
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const svgUrl = URL.createObjectURL(svgBlob);
        const downloadLink = document.createElement('a');
        downloadLink.href = svgUrl;
        downloadLink.download = `qrcode_${Date.now()}.svg`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(svgUrl);
    };

    const downloadRaster = (format: 'png' | 'jpg') => {
        if (!qrRef.current) return;
        const canvas = qrRef.current.querySelector('canvas');
        if (!canvas) return;

        const tempCanvas = document.createElement('canvas');
        const ctx = tempCanvas.getContext('2d');
        if (!ctx) return;

        const borderPadding = hasBorder ? Number(borderThickness) : 0;
        const innerPadding = 10;
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
    };

    return (
        <div className="lg:col-span-2 flex flex-col">
            <div className="card p-8 flex flex-col items-center justify-between bg-white dark:bg-[#1e293b] relative">
                <div className="text-sm font-medium text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">Vorschau</div>

                <div className="flex-grow flex items-center justify-center w-full">
                    <div
                        ref={qrRef}
                        className="transition-all duration-300 flex flex-col items-center justify-center"
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
    );
}
