import { Type, Palette, RotateCcw } from 'lucide-react';

export interface QRSettings {
    text: string;
    fgColor: string;
    bgColor: string;
    hasBorder: boolean;
    borderThickness: number;
    borderColor: string;
    bottomText: string;
    textColor: string;
}

interface ControlPanelProps {
    settings: QRSettings;
    onChange: (settings: QRSettings) => void;
    onReset: () => void;
}

export const DEFAULT_SETTINGS: QRSettings = {
    text: '',
    fgColor: '#000000',
    bgColor: '#ffffff',
    hasBorder: false,
    borderThickness: 10,
    borderColor: '#374151',
    bottomText: '',
    textColor: '#000000',
};

export function ControlPanel({ settings, onChange, onReset }: ControlPanelProps) {
    const update = <K extends keyof QRSettings>(key: K, value: QRSettings[K]) => {
        onChange({ ...settings, [key]: value });
    };

    const hasChanges = JSON.stringify(settings) !== JSON.stringify(DEFAULT_SETTINGS);

    return (
        <div className="lg:col-span-1 flex flex-col gap-6">
            {/* Content & Text */}
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
                        value={settings.text}
                        onChange={(e) => update('text', e.target.value)}
                        placeholder="Link, Text, ..."
                    />
                </div>

                <div>
                    <label className="label">Beschriftung</label>
                    <input
                        type="text"
                        className="input-field"
                        value={settings.bottomText}
                        onChange={(e) => update('bottomText', e.target.value)}
                        placeholder="Scan mich!, Hinweis, ..."
                    />
                </div>
            </div>

            {/* Colors & Design */}
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
                                value={settings.fgColor}
                                onChange={(e) => update('fgColor', e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="label">Hintergrund</label>
                        <div className="flex gap-2">
                            <input
                                type="color"
                                className="h-10 w-full cursor-pointer rounded border border-gray-200"
                                value={settings.bgColor}
                                onChange={(e) => update('bgColor', e.target.value)}
                            />
                        </div>
                    </div>
                    {settings.bottomText && (
                        <div className="col-span-2 animate-in fade-in duration-300">
                            <label className="label">Text Farbe</label>
                            <input
                                type="color"
                                className="h-10 w-full cursor-pointer rounded border border-gray-200"
                                value={settings.textColor}
                                onChange={(e) => update('textColor', e.target.value)}
                            />
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-3 pt-2">
                    <input
                        id="border-toggle"
                        type="checkbox"
                        className="w-5 h-5 accent-primary cursor-pointer"
                        checked={settings.hasBorder}
                        onChange={(e) => update('hasBorder', e.target.checked)}
                    />
                    <label htmlFor="border-toggle" className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
                        Rahmen hinzufügen
                    </label>
                </div>

                {settings.hasBorder && (
                    <div className="space-y-4 pt-2 border-t border-gray-100 dark:border-gray-800 mt-2 animate-in fade-in slide-in-from-top-2 duration-200">
                        <div>
                            <label className="label">Rahmendicke ({settings.borderThickness}px)</label>
                            <input
                                type="range"
                                min="1"
                                max="50"
                                value={settings.borderThickness}
                                onChange={(e) => update('borderThickness', Number(e.target.value))}
                                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
                            />
                        </div>
                        <div>
                            <label className="label">Rahmenfarbe</label>
                            <input
                                type="color"
                                className="h-10 w-full cursor-pointer rounded border border-gray-200"
                                value={settings.borderColor}
                                onChange={(e) => update('borderColor', e.target.value)}
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Reset Button */}
            {hasChanges && (
                <button
                    onClick={onReset}
                    className="flex items-center justify-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 py-2 transition-colors duration-200 animate-in fade-in duration-300"
                >
                    <RotateCcw className="w-4 h-4" />
                    Zurücksetzen
                </button>
            )}
        </div>
    );
}
