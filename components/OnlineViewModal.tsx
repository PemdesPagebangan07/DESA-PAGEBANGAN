import React, { useEffect, useState, useRef } from 'react';

interface OnlineViewModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const OnlineViewModal: React.FC<OnlineViewModalProps> = ({ isOpen, onClose, children }) => {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const bannerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    const handlePrint = () => window.print();

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    };
    
    const handleOpenInNewTab = () => {
        if (!bannerRef.current) return;

        const bannerHtml = bannerRef.current.innerHTML;
        const tailwindUrl = "https://cdn.tailwindcss.com";
        const fontAwesomeUrl = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css";

        const newTabHtml = `
            <!DOCTYPE html>
            <html lang="id">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Pratinjau Banner APBDes</title>
                <script src="${tailwindUrl}"></script>
                <link rel="stylesheet" href="${fontAwesomeUrl}" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
                <style>
                    body {
                        background-color: #f1f5f9;
                        display: flex;
                        justify-content: center;
                        align-items: flex-start;
                        padding: 2rem;
                        min-height: 100vh;
                        box-sizing: border-box;
                    }
                    .printable-area {
                        transform-origin: top center;
                        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
                        border-radius: 0.75rem;
                    }
                </style>
            </head>
            <body>
                ${bannerHtml}
            </body>
            </html>
        `;

        const newTab = window.open();
        if (newTab) {
            newTab.document.open();
            newTab.document.write(newTabHtml);
            newTab.document.close();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 no-print" onClick={onClose}>
            <div className="bg-slate-100 rounded-xl shadow-2xl w-full max-w-7xl max-h-full overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
                <header className="flex justify-between items-center p-4 border-b bg-white">
                    <h5 className="text-lg font-semibold text-slate-800">Tampilan Online Banner APBDes</h5>
                    <div className="flex space-x-2">
                        <button onClick={handleOpenInNewTab} className="px-3 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors flex items-center space-x-2">
                            <i className="fas fa-external-link-alt"></i><span>Tab Baru</span>
                        </button>
                        <button onClick={handlePrint} className="px-3 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors flex items-center space-x-2">
                            <i className="fas fa-print"></i><span>Cetak</span>
                        </button>
                        <button onClick={toggleFullscreen} className="px-3 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors flex items-center space-x-2">
                            {isFullscreen ? <><i className="fas fa-compress"></i><span>Exit</span></> : <><i className="fas fa-expand"></i><span>Fullscreen</span></>}
                        </button>
                        <button onClick={onClose} className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors">
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                </header>
                <main className="p-6 overflow-auto flex-grow" ref={bannerRef}>
                    {children}
                </main>
                <footer className="p-3 border-t bg-white text-xs text-slate-500 flex justify-between">
                    <span>Diakses pada: {new Date().toLocaleString('id-ID')}</span>
                    <span>APBDes Generator v1.0</span>
                </footer>
            </div>
        </div>
    );
};

export default OnlineViewModal;