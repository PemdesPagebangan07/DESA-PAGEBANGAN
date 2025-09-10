
import React from 'react';
import type { APBDesDataSet, PendapatanItem } from '../types';
import { KODE_PENDAPATAN } from '../constants';

interface PendapatanSectionProps {
    dataSet: APBDesDataSet;
    setDataSet: React.Dispatch<React.SetStateAction<APBDesDataSet>>;
}

const PendapatanSection: React.FC<PendapatanSectionProps> = ({ dataSet, setDataSet }) => {
    
    const updateItem = (id: string, field: keyof PendapatanItem, value: any) => {
        setDataSet(prev => ({
            ...prev,
            pendapatan: prev.pendapatan.map(p => p.id === id ? { ...p, [field]: value } : p)
        }));
    };

    const updateJenis = (id: string, nama: string) => {
        const kode = KODE_PENDAPATAN[nama] || '';
        setDataSet(prev => ({
            ...prev,
            pendapatan: prev.pendapatan.map(p => p.id === id ? { ...p, nama, kode } : p)
        }));
    };
    
    const addItem = () => {
        const newItem: PendapatanItem = { id: crypto.randomUUID(), kode: '', nama: '', jumlah: 0 };
        setDataSet(prev => ({ ...prev, pendapatan: [...prev.pendapatan, newItem] }));
    };

    const removeItem = (id: string) => {
        setDataSet(prev => ({ ...prev, pendapatan: prev.pendapatan.filter(p => p.id !== id) }));
    };

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-semibold text-sky-600 border-b-2 border-sky-200 pb-2">Data Pendapatan</h3>
            {dataSet.pendapatan.map((item) => (
                <div key={item.id} className="p-4 border rounded-lg bg-slate-50 space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                        <div className="col-span-12 md:col-span-2">
                            <label className="block text-xs font-medium text-slate-600 mb-1">Kode</label>
                            <input type="text" value={item.kode} className="w-full px-2 py-1.5 border rounded text-sm bg-slate-200" readOnly />
                        </div>
                        <div className="col-span-12 md:col-span-7">
                            <label className="block text-xs font-medium text-slate-600 mb-1">Jenis Pendapatan</label>
                            <select value={item.nama} onChange={(e) => updateJenis(item.id, e.target.value)} className="w-full px-2 py-1.5 border rounded text-sm bg-white">
                                <option value="">Pilih Jenis Pendapatan</option>
                                {Object.keys(KODE_PENDAPATAN).map(nama => 
                                    <option key={nama} value={nama}>{nama}</option>
                                )}
                            </select>
                        </div>
                        <div className="col-span-12 md:col-span-3">
                            <label className="block text-xs font-medium text-slate-600 mb-1">Jumlah</label>
                            <input type="number" value={item.jumlah} onChange={(e) => updateItem(item.id, 'jumlah', parseInt(e.target.value, 10) || 0)} className="w-full px-2 py-1.5 border rounded text-sm text-right"/>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button onClick={() => removeItem(item.id)} className="px-3 py-1 bg-red-100 text-red-600 rounded text-sm hover:bg-red-200 transition-colors flex items-center space-x-1">
                            <i className="fas fa-trash"></i><span>Hapus</span>
                        </button>
                    </div>
                </div>
            ))}
            <button onClick={addItem} className="px-4 py-2 bg-sky-100 text-sky-700 rounded-lg hover:bg-sky-200 transition-colors font-semibold flex items-center space-x-2">
                <i className="fas fa-plus"></i><span>Tambah Item Pendapatan</span>
            </button>
        </div>
    );
};

export default PendapatanSection;
