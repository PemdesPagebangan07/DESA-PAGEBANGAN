
export type AppMode = 'info' | 'awal' | 'perubahan';

export interface InfoData {
  namaDesa: string;
  namaKecamatan: string;
  namaKabupaten: string;
  namaKepala: string;
  tahunAnggaran: string;
  logoUrl: string;
  fotoKepalaUrl: string;
  tandaTanganUrl: string;
}

export interface PendapatanItem {
  id: string;
  kode: string;
  nama: string;
  jumlah: number;
}

export interface BelanjaItem {
  id: string;
  kodeBidang: string;
  namaBidang: string;
  kodeKegiatan: string;
  namaKegiatan: string;
  jumlah: number;
}

export interface PembiayaanItem {
  id: string;
  kode: string;
  nama: string;
  jumlah: number;
}

export interface APBDesDataSet {
  pendapatan: PendapatanItem[];
  belanja: BelanjaItem[];
  pembiayaan: PembiayaanItem[];
}

export interface APBDesData extends InfoData {
  apbdesAwal: APBDesDataSet | null;
  apbdesPerubahan: APBDesDataSet | null;
}
