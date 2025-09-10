import React, { useState, useEffect } from 'react';
import type { InfoData } from '../types';
import FileUpload from './FileUpload';

interface InfoDesaProps {
    initialData: InfoData;
    onSave: (data: InfoData) => void;
}

const InfoDesa: React.FC<InfoDesaProps> = ({ initialData, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(initialData);

    useEffect(() => {
        setFormData(initialData);
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleFileChange = (field: keyof InfoData, url: string) => {
        setFormData(prev => ({ ...prev, [field]: url }));
    };

    const handleSaveClick = () => {
        onSave(formData);
        setIsEditing(false);
        alert('Informasi desa berhasil disimpan dan akan digunakan untuk sesi berikutnya.');
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-700">Informasi Desa</h2>
                <div className="space-x-2">
                    {isEditing ? (
                        <button onClick={handleSaveClick} className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors flex items-center space-x-2">
                            <i className="fas fa-save"></i><span>Simpan Perubahan</span>
                        </button>
                    ) : (
                        <button onClick={handleEditClick} className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors flex items-center space-x-2">
                            <i className="fas fa-edit"></i><span>Edit</span>
                        </button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <InputField label="Nama Desa" id="namaDesa" value={formData.namaDesa} onChange={handleChange} disabled={!isEditing} />
                    <InputField label="Kecamatan" id="namaKecamatan" value={formData.namaKecamatan} onChange={handleChange} disabled={!isEditing} />
                    <InputField label="Kabupaten" id="namaKabupaten" value={formData.namaKabupaten} onChange={handleChange} disabled={!isEditing} />
                    <InputField label="Nama Kepala Desa" id="namaKepala" value={formData.namaKepala} onChange={handleChange} disabled={!isEditing} />
                    <InputField label="Tahun Anggaran" id="tahunAnggaran" type="number" value={formData.tahunAnggaran} onChange={handleChange} disabled={!isEditing} />
                </div>
                
                <div className="space-y-6">
                    <FileUpload
                        label="Logo Pemerintah Daerah"
                        imageUrl={formData.logoUrl}
                        onFileSelect={(url) => handleFileChange('logoUrl', url)}
                        disabled={!isEditing}
                        iconClass="fa-landmark"
                    />
                    <FileUpload
                        label="Foto Kepala Desa"
                        imageUrl={formData.fotoKepalaUrl}
                        onFileSelect={(url) => handleFileChange('fotoKepalaUrl', url)}
                        disabled={!isEditing}
                        iconClass="fa-user-tie"
                    />
                    <FileUpload
                        label="Tanda Tangan Kepala Desa"
                        imageUrl={formData.tandaTanganUrl}
                        onFileSelect={(url) => handleFileChange('tandaTanganUrl', url)}
                        disabled={!isEditing}
                        iconClass="fa-signature"
                    />
                </div>
            </div>
        </div>
    );
};

interface InputFieldProps {
    label: string;
    id: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled: boolean;
    type?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, id, value, onChange, disabled, type = 'text' }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-slate-600 mb-1">{label}</label>
        <input
            type={type}
            id={id}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors disabled:bg-slate-100 disabled:cursor-not-allowed"
        />
    </div>
);

export default InfoDesa;