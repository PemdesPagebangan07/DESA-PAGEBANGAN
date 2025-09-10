
import React from 'react';
import type { APBDesDataSet, BelanjaItem } from '../types';
import { BIDANG_KEGIATAN } from '../constants';

interface BelanjaSectionProps {
    dataSet: APBDesDataSet;
    setDataSet: React.Dispatch<React.SetStateAction<APBDesDataSet>>;
}

const BelanjaSection: React.FC<BelanjaSectionProps> = ({ dataSet, setDataSet }) => {
    
    const updateItem = (id: string, field: keyof BelanjaItem, value: any) => {
        setDataSet(prev => ({
            ...prev,
            belanja: prev.belanja.map(b => b.id === id ? { ...b, [field]: value } : b)
        }));
    };

    const updateBidang = (id: string, kodeBidang: string) => {
        const namaBidang = BIDANG_KEGIATAN[kodeBidang]?.nama || '';
        setDataSet(prev => ({
            ...prev,
            belanja: prev.belanja.map(b => b.id === id ? { ...b, kodeBidang, namaBidang, kodeKegiatan: '', namaKegiatan: '' } : b)
        }));
    };
    
    const updateKegiatan = (id: string, kodeKegiatan: string) => {
        const item = dataSet.belanja.find(b => b.id === id);
        if (!item) return;
        const namaKegiatan = BIDANG_KEGIATAN[item.kodeBidang]?.kegiatan[kodeKegiatan] || '';
        setDataSet(prev => ({
            ...prev,
            belanja: prev.belanja.map(b => b.id === id ? { ...b, kodeKegiatan, namaKegiatan } : b)
        }));
    };
    
    const addItem = () => {
        const newItem: BelanjaItem = { id: crypto.randomUUID(), kodeBidang: '', namaBidang: '', kodeKegiatan: '', namaKegiatan: '', jumlah: 0 };
        setDataSet(prev => ({ ...prev, belanja: [...prev.belanja, newItem] }));
    };

    const removeItem = (id: string) => {
        setDataSet(prev => ({ ...prev, belanja: prev.belanja.filter(b => b.id !== id) }));
    };

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-semibold text-rose-600 border-b-2 border-rose-200 pb-2">Data Belanja</h3>
            {dataSet.belanja.map((item) => (
                <div key={item.id} className="p-4 border rounded-lg bg-slate-50 space-y-3">
                    <div className="grid grid-cols-12 gap-3 items-center">
                        <div className="col-span-3">
                            <label className="block text-xs font-medium text-slate-600 mb-1">Bidang</label>
                            <select value={item.kodeBidang} onChange={(e) => updateBidang(item.id, e.target.value)} className="w-full px-2 py-1.5 border rounded text-sm bg-white">
                                <option value="">Pilih Bidang</option>
                                {Object.keys(BIDANG_KEGIATAN).map(kode => 
                                    <option key={kode} value={kode}>{kode} - {BIDANG_KEGIATAN[kode].nama}</option>
                                )}
                            </select>
                        </div>
                        <div className="col-span-6">
                            <label className="block text-xs font-medium text-slate-600 mb-1">Kegiatan</label>
                            <select value={item.kodeKegiatan} onChange={(e) => updateKegiatan(item.id, e.target.value)} className="w-full px-2 py-1.5 border rounded text-sm bg-white" disabled={!item.kodeBidang}>
                                <option value="">Pilih Kegiatan</option>
                                {item.kodeBidang && BIDANG_KEGIATAN[item.kodeBidang] && Object.keys(BIDANG_KEGIATAN[item.kodeBidang].kegiatan).map(kode => 
                                    <option key={kode} value={kode}>{kode} - {BIDANG_KEGIATAN[item.kodeBidang].kegiatan[kode]}</option>
                                )}
                            </select>
                        </div>
                        <div className="col-span-3">
                            <label className="block text-xs font-medium text-slate-600 mb-1">Anggaran</label>
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
            <button onClick={addItem} className="px-4 py-2 bg-rose-100 text-rose-700 rounded-lg hover:bg-rose-200 transition-colors font-semibold flex items-center space-x-2">
                <i className="fas fa-plus"></i><span>Tambah Kegiatan Belanja</span>
            </button>
        </div>
    );
};

export default BelanjaSection;
