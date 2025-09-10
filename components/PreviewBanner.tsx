import React from 'react';
import type { InfoData, APBDesDataSet, AppMode } from '../types';
import { formatCurrency } from '../utils/formatter';

interface PreviewBannerProps {
    data: InfoData;
    apbdesData: APBDesDataSet;
    mode: AppMode;
    apbdesAwal: APBDesDataSet | null;
}

const tableClasses = {
    table: "w-full border-collapse text-xs",
    th: "border border-black p-1 font-bold text-center bg-slate-100",
    td: "border border-black p-1",
    tdRight: "border border-black p-1 text-right",
    tdBold: "border border-black p-1 font-bold",
    rowHeader: "bg-slate-50 font-semibold",
};

const PreviewBanner: React.FC<PreviewBannerProps> = ({ data, apbdesData, mode, apbdesAwal }) => {
    if (mode === 'info') return null;

    const title = mode === 'awal' 
        ? 'ANGGARAN PENDAPATAN DAN BELANJA DESA'
        : 'PERUBAHAN ANGGARAN PENDAPATAN DAN BELANJA DESA';

    const totalPendapatan = apbdesData.pendapatan.reduce((sum, item) => sum + item.jumlah, 0);
    const totalBelanja = apbdesData.belanja.reduce((sum, item) => sum + item.jumlah, 0);
    const penerimaanPembiayaan = apbdesData.pembiayaan.filter(p => p.kode.startsWith('6.1')).reduce((sum, item) => sum + item.jumlah, 0);
    const pengeluaranPembiayaan = apbdesData.pembiayaan.filter(p => p.kode.startsWith('6.2')).reduce((sum, item) => sum + item.jumlah, 0);
    const pembiayaanNetto = penerimaanPembiayaan - pengeluaranPembiayaan;
    const surplusDefisit = totalPendapatan - totalBelanja;
    const sisaLebih = surplusDefisit + pembiayaanNetto;

    // FIX: Made the 'kode' property optional in the item parameter's type.
    // This allows BelanjaItem, which does not have a 'kode' property, to be passed to this function, resolving the type error.
    const getOriginalAmount = (type: 'pendapatan' | 'belanja' | 'pembiayaan', item: { kode?: string; kodeBidang?: string; kodeKegiatan?: string; }): number => {
        if (mode !== 'perubahan' || !apbdesAwal) return 0;
        
        let originalItem;
        if (type === 'belanja') {
            originalItem = apbdesAwal.belanja.find(orig => orig.kodeBidang === item.kodeBidang && orig.kodeKegiatan === item.kodeKegiatan);
        } else {
            originalItem = apbdesAwal[type].find(orig => orig.kode === item.kode);
        }
        return originalItem ? originalItem.jumlah : 0;
    };
    
    const getTotalOriginalAmount = (type: keyof APBDesDataSet) => {
        if (mode !== 'perubahan' || !apbdesAwal) return 0;
        return apbdesAwal[type].reduce((sum, item) => sum + item.jumlah, 0);
    }
    
    const originalTotalPendapatan = getTotalOriginalAmount('pendapatan');
    const originalTotalBelanja = getTotalOriginalAmount('belanja');
    const originalPenerimaanPembiayaan = apbdesAwal?.pembiayaan.filter(p => p.kode.startsWith('6.1')).reduce((sum, item) => sum + item.jumlah, 0) || 0;
    const originalPengeluaranPembiayaan = apbdesAwal?.pembiayaan.filter(p => p.kode.startsWith('6.2')).reduce((sum, item) => sum + item.jumlah, 0) || 0;
    const originalPembiayaanNetto = originalPenerimaanPembiayaan - originalPengeluaranPembiayaan;
    const originalSurplusDefisit = originalTotalPendapatan - originalTotalBelanja;
    const originalSisaLebih = originalSurplusDefisit + originalPembiayaanNetto;

    const RenderRowData: React.FC<{ amount: number; originalAmount: number }> = ({ amount, originalAmount }) => {
        if (mode === 'awal') {
            return <td className={tableClasses.tdRight}>{formatCurrency(amount)}</td>;
        }
        const difference = amount - originalAmount;
        return (
            <>
                <td className={tableClasses.tdRight}>{formatCurrency(originalAmount)}</td>
                <td className={tableClasses.tdRight}>{formatCurrency(amount)}</td>
                <td className={tableClasses.tdRight}>{formatCurrency(difference)}</td>
            </>
        );
    };

    return (
        <div className="bg-white p-4 printable-area">
            <header className="mb-4">
                <div className="flex justify-between items-center">
                    <div className="w-24 h-24 flex items-center justify-center">
                        {data.logoUrl && <img src={data.logoUrl} alt="Logo" className="max-w-full max-h-full object-contain" />}
                    </div>
                    <div className="text-center">
                        <div className="font-bold text-sm">PEMERINTAH KABUPATEN {data.namaKabupaten.toUpperCase()}</div>
                        <div className="font-bold text-sm">KECAMATAN {data.namaKecamatan.toUpperCase()}</div>
                        <div className="font-bold text-lg">DESA {data.namaDesa.toUpperCase()}</div>
                        <h1 className="text-md font-bold mt-2">{title}</h1>
                        <h2 className="text-sm">TAHUN ANGGARAN {data.tahunAnggaran}</h2>
                    </div>
                    <div className="w-24 h-24 flex items-center justify-center">
                        {data.fotoKepalaUrl && <img src={data.fotoKepalaUrl} alt="Kepala Desa" className="max-w-full max-h-full object-cover rounded-lg" />}
                    </div>
                </div>
            </header>
            
            <table className={tableClasses.table}>
                <thead>
                    <tr>
                        <th className={tableClasses.th} style={{ width: '8%' }}>KODE</th>
                        <th className={tableClasses.th} style={{ width: '30%' }}>URAIAN</th>
                        {mode === 'awal' ? (
                            <th className={tableClasses.th} style={{ width: '22%' }}>ANGGARAN (Rp)</th>
                        ) : (
                            <>
                                <th className={tableClasses.th}>ANGGARAN SEBELUM PERUBAHAN (Rp)</th>
                                <th className={tableClasses.th}>ANGGARAN SESUDAH PERUBAHAN (Rp)</th>
                                <th className={tableClasses.th}>KURANG/LEBIH ANGGARAN (Rp)</th>
                            </>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {/* Pendapatan */}
                    <tr className={tableClasses.rowHeader}>
                        <td className={tableClasses.tdBold}>4</td>
                        <td className={tableClasses.tdBold}>PENDAPATAN</td>
                        <RenderRowData amount={totalPendapatan} originalAmount={originalTotalPendapatan} />
                    </tr>
                    {apbdesData.pendapatan.map(item => (
                        <tr key={item.id}>
                            <td className={tableClasses.td}>{item.kode}</td>
                            <td className={tableClasses.td}>{item.nama}</td>
                            <RenderRowData amount={item.jumlah} originalAmount={getOriginalAmount('pendapatan', item)} />
                        </tr>
                    ))}

                    {/* Belanja */}
                     <tr className={tableClasses.rowHeader}>
                        <td className={tableClasses.tdBold}>5</td>
                        <td className={tableClasses.tdBold}>BELANJA</td>
                        <RenderRowData amount={totalBelanja} originalAmount={originalTotalBelanja} />
                    </tr>
                    {apbdesData.belanja.map(item => (
                        <tr key={item.id}>
                            <td className={tableClasses.td}>{item.kodeKegiatan}</td>
                            <td className={tableClasses.td}>
                                <div>{item.namaBidang}</div>
                                <div className="pl-4 text-slate-600">- {item.namaKegiatan}</div>
                            </td>
                            <RenderRowData amount={item.jumlah} originalAmount={getOriginalAmount('belanja', item)} />
                        </tr>
                    ))}
                    
                    {/* Surplus/Defisit */}
                    <tr className={tableClasses.rowHeader}>
                        <td></td>
                        <td className={tableClasses.tdBold}>SURPLUS / (DEFISIT)</td>
                        <RenderRowData amount={surplusDefisit} originalAmount={originalSurplusDefisit} />
                    </tr>

                    {/* Pembiayaan */}
                    <tr className={tableClasses.rowHeader}>
                        <td className={tableClasses.tdBold}>6</td>
                        <td className={tableClasses.tdBold}>PEMBIAYAAN</td>
                        { mode === 'awal' ? <td></td> : <><td/><td/><td/></>}
                    </tr>
                    {apbdesData.pembiayaan.map(item => (
                        <tr key={item.id}>
                            <td className={tableClasses.td}>{item.kode}</td>
                            <td className={tableClasses.td}>{item.nama}</td>
                            <RenderRowData amount={item.jumlah} originalAmount={getOriginalAmount('pembiayaan', item)} />
                        </tr>
                    ))}
                    <tr className={tableClasses.rowHeader}>
                        <td></td>
                        <td className={tableClasses.tdBold}>PEMBIAYAAN NETTO</td>
                        <RenderRowData amount={pembiayaanNetto} originalAmount={originalPembiayaanNetto} />
                    </tr>

                    {/* Sisa Lebih */}
                    <tr className={tableClasses.rowHeader}>
                        <td></td>
                        <td className={tableClasses.tdBold}>SISA LEBIH/(KURANG) PEMBIAYAAN ANGGARAN</td>
                        <RenderRowData amount={sisaLebih} originalAmount={originalSisaLebih} />
                    </tr>
                </tbody>
            </table>
            
             <footer className="mt-6 flex justify-end">
                <div className="text-center text-xs w-1/3">
                    <p>Ditetapkan di: {data.namaDesa}</p>
                    <p>Pada tanggal: {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <p className="mt-2 font-bold">KEPALA DESA {data.namaDesa.toUpperCase()}</p>
                    <div className="h-16 flex items-center justify-center my-1">
                        {data.tandaTanganUrl ? <img src={data.tandaTanganUrl} alt="Tanda Tangan" className="max-h-12 object-contain" /> : <div className="text-slate-400">Tanda Tangan</div> }
                    </div>
                    <p className="font-bold underline">{data.namaKepala.toUpperCase()}</p>
                </div>
            </footer>
        </div>
    );
};

export default PreviewBanner;