
import React from 'react';
import type { AppMode } from '../types';

interface NavbarProps {
    currentMode: AppMode;
    onSwitchMode: (mode: AppMode) => void;
    onViewOnline: () => void;
}

const NavButton: React.FC<{ isActive: boolean; onClick: () => void; children: React.ReactNode, className?: string }> = ({ isActive, onClick, children, className = '' }) => {
    const baseClasses = "px-4 py-2 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
    const activeClasses = "bg-indigo-600 text-white shadow-md hover:bg-indigo-700 focus:ring-indigo-500";
    const inactiveClasses = "bg-white text-slate-600 hover:bg-slate-100 focus:ring-indigo-400";
    
    return (
        <button onClick={onClick} className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses} ${className}`}>
            {children}
        </button>
    );
};


const Navbar: React.FC<NavbarProps> = ({ currentMode, onSwitchMode, onViewOnline }) => {
    return (
        <header className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-40 border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="flex items-center space-x-3">
                        <i className="fas fa-landmark text-3xl text-indigo-600"></i>
                        <h1 className="text-2xl font-bold text-slate-800">APBDes Generator</h1>
                    </div>
                    <div className="flex items-center space-x-2">
                        <NavButton isActive={currentMode === 'info'} onClick={() => onSwitchMode('info')}>Info Desa</NavButton>
                        <NavButton isActive={currentMode === 'awal'} onClick={() => onSwitchMode('awal')}>APBDes Awal</NavButton>
                        <NavButton isActive={currentMode === 'perubahan'} onClick={() => onSwitchMode('perubahan')}>APBDes Perubahan</NavButton>
                         <button onClick={onViewOnline} className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-semibold shadow-md hover:bg-emerald-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 flex items-center space-x-2">
                            <i className="fas fa-globe"></i>
                            <span>Lihat Online</span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
