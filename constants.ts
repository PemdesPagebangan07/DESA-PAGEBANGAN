
import type { PendapatanItem, BelanjaItem, PembiayaanItem } from './types';

export const KODE_PENDAPATAN: Record<string, string> = {
    'Pendapatan Asli Desa': '4.1.1',
    'Hasil Usaha Desa': '4.1.2',
    'Swadaya, Partisipasi dan Gotong Royong': '4.1.3',
    'Lain-lain Pendapatan Asli Desa': '4.1.4',
    'Dana Desa': '4.2.1',
    'Bagian dari Hasil Pajak dan Retribusi Daerah Kabupaten/Kota': '4.2.2',
    'Alokasi Dana Desa': '4.2.3',
    'Bantuan Keuangan dari APBD Provinsi': '4.2.4',
    'Bantuan Keuangan dari APBD Kabupaten/Kota': '4.2.5',
    'Hibah dan Sumbangan dari Pihak Ketiga': '4.3.1',
    'Lain-lain Pendapatan Desa yang Sah': '4.3.2'
};

export const BIDANG_KEGIATAN: Record<string, { nama: string; kegiatan: Record<string, string> }> = {
    '01': {
        nama: 'Penyelenggaraan Pemerintahan Desa',
        kegiatan: {
            '01.01': 'Penyediaan Penghasilan Tetap dan Tunjangan Kepala Desa',
            '01.02': 'Penyediaan Penghasilan Tetap dan Tunjangan Perangkat Desa',
            '01.03': 'Penyediaan Jaminan Sosial bagi Kepala Desa dan Perangkat Desa',
            '01.04': 'Penyediaan Operasional Pemerintah Desa',
            '01.05': 'Penyediaan Tunjangan BPD',
            '01.06': 'Penyediaan Operasional BPD',
            '01.07': 'Penyediaan Insentif/Operasional RT/RW'
        }
    },
    '02': {
        nama: 'Pelaksanaan Pembangunan Desa',
        kegiatan: {
            '02.01': 'Pembangunan/Rehabilitasi/Peningkatan Jalan Desa',
            '02.02': 'Pembangunan/Rehabilitasi/Peningkatan Jalan Lingkungan Pemukiman',
            '02.03': 'Pembangunan/Rehabilitasi/Peningkatan Jalan Usaha Tani',
            '02.04': 'Pembangunan/Rehabilitasi/Peningkatan Jembatan Desa',
        }
    },
    '03': {
        nama: 'Pembinaan Kemasyarakatan Desa',
        kegiatan: {
            '03.01': 'Pembinaan Keamanan, Ketertiban dan Perlindungan Masyarakat Desa',
            '03.02': 'Pembinaan Kerukunan Umat Beragama',
            '03.03': 'Pengadaan/Penyelenggaraan Pos Keamanan Desa',
        }
    },
    '04': {
        nama: 'Pemberdayaan Masyarakat Desa',
        kegiatan: {
            '04.01': 'Pelatihan Kepala Desa dan Perangkat Desa',
            '04.02': 'Peningkatan Kapasitas Masyarakat',
            '04.03': 'Pengembangan Teknologi Tepat Guna',
        }
    },
    '05': {
        nama: 'Penanggulangan Bencana, Darurat dan Mendesak Desa',
        kegiatan: {
            '05.01': 'Kegiatan Tanggap Darurat Bencana',
            '05.02': 'Penanganan Keadaan Mendesak'
        }
    }
};

export const initialPendapatan: PendapatanItem[] = [
    { id: crypto.randomUUID(), kode: '4.1.1', nama: 'Pendapatan Asli Desa', jumlah: 50000000 },
    { id: crypto.randomUUID(), kode: '4.2.1', nama: 'Dana Desa', jumlah: 900000000 },
    { id: crypto.randomUUID(), kode: '4.2.3', nama: 'Alokasi Dana Desa', jumlah: 400000000 }
];

export const initialBelanja: BelanjaItem[] = [
    { id: crypto.randomUUID(), kodeBidang: '01', namaBidang: 'Penyelenggaraan Pemerintahan Desa', kodeKegiatan: '01.01', namaKegiatan: 'Penyediaan Penghasilan Tetap dan Tunjangan Kepala Desa', jumlah: 150000000 },
    { id: crypto.randomUUID(), kodeBidang: '02', namaBidang: 'Pelaksanaan Pembangunan Desa', kodeKegiatan: '02.01', namaKegiatan: 'Pembangunan/Rehabilitasi/Peningkatan Jalan Desa', jumlah: 750000000 },
];

export const initialPembiayaan: PembiayaanItem[] = [
    { id: crypto.randomUUID(), kode: '6.1', nama: 'Penerimaan Pembiayaan', jumlah: 0 },
    { id: crypto.randomUUID(), kode: '6.2', nama: 'Pengeluaran Pembiayaan', jumlah: 0 }
];
