
import React from 'react';
import type { APBDesDataSet, PembiayaanItem } from '../types';

interface PembiayaanSectionProps {
    dataSet: APBDesDataSet;
    setDataSet: React.Dispatch<React.SetStateAction<APBDesDataSet>>;
}

const PembiayaanSection: React.FC<PembiayaanSectionProps> = ({ dataSet, setDataSet }) => {
    
    const updateItem = (id: string, field: keyof PembiayaanItem, value: any) => {
        setDataSet(prev => ({
            ...prev,
            pembiayaan: prev.pembiayaan.map(p => p.id === id ? { ...p, [field]: value } : p)
        }));
    };

    const addItem = () => {
        const newItem: PembiayaanItem = { id: crypto.randomUUID(), kode: '', nama: '', jumlah: 0 };
        setDataSet(prev => ({ ...prev, pembiayaan: [...prev.pembiayaan, newItem] }));
    };

    const removeItem = (id: string) => {
        setDataSet(prev => ({ ...prev, pembiayaan: prev.pembiayaan.filter(p => p.id !== id) }));
    };

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-semibold text-emerald-600 border-b-2 border-emerald-200 pb-2">Data Pembiayaan</h3>
            {dataSet.pembiayaan.map((item) => (
                <div key={item.id} className="p-4 border rounded-lg bg-slate-50">
                    <div className="grid grid-cols-12 gap-3 items-center">
                        <div className="col-span-2">
                             <label className="block text-xs font-medium text-slate-600 mb-1">Kode</label>
                            <input type="text" value={item.kode} onChange={(e) => updateItem(item.id, 'kode', e.target.value)} className="w-full px-2 py-1.5 border rounded text-sm"/>
                        </div>
                        <div className="col-span-7">
                             <label className="block text-xs font-medium text-slate-600 mb-1">Uraian</label>
                            <input type="text" value={item.nama} onChange={(e) => updateItem(item.id, 'nama', e.target.value)} className="w-full px-2 py-1.5 border rounded text-sm"/>
                        </div>
                        <div className="col-span-2">
                             <label className="block text-xs font-medium text-slate-600 mb-1">Jumlah</label>
                            <input type="number" value={item.jumlah} onChange={(e) => updateItem(item.id, 'jumlah', parseInt(e.target.value, 10) || 0)} className="w-full px-2 py-1.5 border rounded text-sm text-right"/>
                        </div>
                         <div className="col-span-1 flex items-end">
                            <button onClick={() => removeItem(item.id)} className="w-full px-3 py-1.5 bg-red-100 text-red-600 rounded text-sm hover:bg-red-200 transition-colors">
                                <i className="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            ))}
            <button onClick={addItem} className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors font-semibold flex items-center space-x-2">
                <i className="fas fa-plus"></i><span>Tambah Item Pembiayaan</span>
            </button>
        </div>
    );
};

export default PembiayaanSection;
