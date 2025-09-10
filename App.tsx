import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import InfoDesa from './components/InfoDesa';
import InputForm from './components/InputForm';
import PreviewBanner from './components/PreviewBanner';
import OnlineViewModal from './components/OnlineViewModal';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { APBDesData, APBDesDataSet, AppMode } from './types';
import { initialPendapatan, initialBelanja, initialPembiayaan } from './constants';

const initialData: APBDesData = {
    namaDesa: 'Harapan Maju',
    namaKecamatan: 'Sejahtera',
    namaKabupaten: 'Makmur',
    namaKepala: 'Budi Santoso',
    tahunAnggaran: new Date().getFullYear().toString(),
    logoUrl: '',
    fotoKepalaUrl: '',
    tandaTanganUrl: '',
    apbdesAwal: null,
    apbdesPerubahan: null,
};

function App() {
    const [data, setData] = useLocalStorage<APBDesData>('apbdesData', initialData);
    const [currentMode, setCurrentMode] = useState<AppMode>('info');
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const [workingDataSet, setWorkingDataSet] = useState<APBDesDataSet>({
        pendapatan: [],
        belanja: [],
        pembiayaan: [],
    });

    useEffect(() => {
        if (currentMode === 'awal') {
            setWorkingDataSet(data.apbdesAwal ?? {
                pendapatan: initialPendapatan,
                belanja: initialBelanja,
                pembiayaan: initialPembiayaan,
            });
        } else if (currentMode === 'perubahan') {
            setWorkingDataSet(data.apbdesPerubahan ?? data.apbdesAwal ?? {
                pendapatan: initialPendapatan,
                belanja: initialBelanja,
                pembiayaan: initialPembiayaan,
            });
        }
    }, [currentMode, data.apbdesAwal, data.apbdesPerubahan]);

    const handleSaveInfo = (infoData: Omit<APBDesData, 'apbdesAwal' | 'apbdesPerubahan'>) => {
        setData(prev => ({ ...prev, ...infoData }));
    };

    const handleSaveData = useCallback(() => {
        if (currentMode === 'awal') {
            setData(prev => ({ ...prev, apbdesAwal: workingDataSet }));
        } else if (currentMode === 'perubahan') {
            setData(prev => ({ ...prev, apbdesPerubahan: workingDataSet }));
        }
        alert('Data APBDes telah berhasil disimpan. Perubahan Anda akan dimuat kembali saat Anda membuka aplikasi ini lagi.');
    }, [currentMode, setData, workingDataSet]);

    const infoData = {
        namaDesa: data.namaDesa,
        namaKecamatan: data.namaKecamatan,
        namaKabupaten: data.namaKabupaten,
        namaKepala: data.namaKepala,
        tahunAnggaran: data.tahunAnggaran,
        logoUrl: data.logoUrl,
        fotoKepalaUrl: data.fotoKepalaUrl,
        tandaTanganUrl: data.tandaTanganUrl,
    };

    return (
        <div className="min-h-screen text-slate-800">
            <Navbar
                currentMode={currentMode}
                onSwitchMode={setCurrentMode}
                onViewOnline={() => setIsModalOpen(true)}
            />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {currentMode === 'info' ? (
                    <InfoDesa initialData={infoData} onSave={handleSaveInfo} />
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                        <InputForm
                            dataSet={workingDataSet}
                            setDataSet={setWorkingDataSet}
                            onSave={handleSaveData}
                            mode={currentMode}
                            apbdesAwal={data.apbdesAwal}
                        />
                        <div className="lg:sticky top-8">
                            <h2 className="text-2xl font-bold mb-4 text-slate-700">Live Preview</h2>
                            <div className="bg-white rounded-xl shadow-lg p-1 overflow-x-auto">
                                <PreviewBanner data={infoData} apbdesData={workingDataSet} mode={currentMode} apbdesAwal={data.apbdesAwal} />
                            </div>
                        </div>
                    </div>
                )}
            </main>
            <OnlineViewModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                 <PreviewBanner data={infoData} apbdesData={workingDataSet} mode={currentMode} apbdesAwal={data.apbdesAwal} />
            </OnlineViewModal>
        </div>
    );
}

export default App;