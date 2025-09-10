import React from 'react';
import type { APBDesDataSet, AppMode } from '../types';
import PendapatanSection from './PendapatanSection';
import BelanjaSection from './BelanjaSection';
import PembiayaanSection from './PembiayaanSection';

interface InputFormProps {
    dataSet: APBDesDataSet;
    setDataSet: React.Dispatch<React.SetStateAction<APBDesDataSet>>;
    onSave: () => void;
    mode: AppMode;
    apbdesAwal: APBDesDataSet | null;
}

const InputForm: React.FC<InputFormProps> = ({ dataSet, setDataSet, onSave, mode, apbdesAwal }) => {
    const title = mode === 'awal' ? 'Input Data APBDes Awal' : 'Input Data APBDes Perubahan';
    
    return (
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-slate-700">{title}</h2>
                <p className="text-slate-500 mt-1">Isi data anggaran sesuai dengan kategori yang tersedia.</p>
                 {mode === 'perubahan' && apbdesAwal && (
                    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 text-blue-800 rounded-lg text-sm flex items-start space-x-3" role="alert">
                        <i className="fas fa-info-circle mt-1 flex-shrink-0"></i>
                        <p>
                            Formulir ini telah diisi otomatis dengan data dari <strong>APBDes Awal</strong>. Anda dapat menambahkan item baru atau mengubah jumlah anggaran pada item yang sudah ada.
                            Perubahan akan terlihat pada kolom 'Anggaran Sesudah Perubahan' di pratinjau.
                        </p>
                    </div>
                )}
            </div>
            
            <PendapatanSection dataSet={dataSet} setDataSet={setDataSet} />
            <BelanjaSection dataSet={dataSet} setDataSet={setDataSet} />
            <PembiayaanSection dataSet={dataSet} setDataSet={setDataSet} />

            <div className="pt-4 border-t border-slate-200">
                <button 
                    onClick={onSave} 
                    className="w-full px-6 py-3 bg-indigo-600 text-white font-bold text-lg rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2 shadow-lg"
                >
                    <i className="fas fa-save"></i>
                    <span>Simpan Data</span>
                </button>
            </div>
        </div>
    );
};

export default InputForm;