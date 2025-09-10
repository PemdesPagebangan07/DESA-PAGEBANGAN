
import React, { useRef } from 'react';

interface FileUploadProps {
    label: string;
    imageUrl: string;
    onFileSelect: (url: string) => void;
    disabled: boolean;
    iconClass: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ label, imageUrl, onFileSelect, disabled, iconClass }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                onFileSelect(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">{label}</label>
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center">
                {imageUrl ? (
                    <img src={imageUrl} className="max-h-32 mx-auto mb-2 rounded-md object-contain" alt="Preview" />
                ) : (
                    <div className="text-slate-400 py-4">
                        <i className={`fas ${iconClass} fa-3x mb-2`}></i>
                        <p>No image uploaded</p>
                    </div>
                )}
                <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                    disabled={disabled}
                />
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-2 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    disabled={disabled}
                >
                    <i className="fas fa-upload mr-2"></i>Upload
                </button>
            </div>
        </div>
    );
};

export default FileUpload;
