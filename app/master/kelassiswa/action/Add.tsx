"use client";
import axios from "axios";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { Modal } from "bootstrap"; // Import API Modal dari Bootstrap

interface Props {
  alert: Function;
  reload: Function;
  kelasId: string;
}

const Tambah = ({ alert, reload, kelasId }: Props) => {
  const [siswaId, setSiswaId] = useState("");
  const [newkelasId, setKelasId] = useState(kelasId);
  const [listNama, setListNama] = useState([]); // Daftar siswa
  const [existingSiswaIds, setExistingSiswaIds] = useState<string[]>([]); // Siswa yang sudah ada di kelas
  const [errorMessage, setErrorMessage] = useState(""); // Pesan error
  const modalRef = useRef<HTMLDivElement | null>(null); // Ref untuk modal
  const [modalInstance, setModalInstance] = useState<Modal | null>(null); // Simpan instansiasi modal

  // Fungsi untuk mendapatkan daftar siswa
  const getSiswa = async () => {
    const res = await axios.get("/api/siswa");
    const hasil = res.data;
    setListNama(hasil);
  };

  // Menggunakan useCallback untuk mencegah fungsi berubah setiap render ulang
  const getSiswaDiKelas = useCallback(async () => {
    const res = await axios.get(`/api/kelassiswa?kelasId=${newkelasId}`);
    const existingSiswa = res.data.map((item: any) => item.siswaId); // Ambil ID siswa yang sudah ada di kelas
    setExistingSiswaIds(existingSiswa);
  }, [newkelasId]);

  // Mengambil siswa dan siswa yang sudah ada di kelas saat komponen dimuat
  useEffect(() => {
    getSiswa();
    getSiswaDiKelas();
  }, [getSiswaDiKelas]);

  // Memperbarui newkelasId jika kelasId berubah
  useEffect(() => {
    setKelasId(kelasId);
  }, [kelasId]);

  // Inisialisasi modal saat modalRef tersedia
  useEffect(() => {
    if (modalRef.current) {
      const instance = new Modal(modalRef.current);
      setModalInstance(instance);
    }
  }, [modalRef]);

  // Fungsi untuk mendapatkan jumlah siswa di kelas tertentu
  const getJumlahSiswaDiKelas = async () => {
    const res = await axios.get(`/api/kelassiswa?kelasId=${newkelasId}`);
    return res.data.length; // Mengembalikan jumlah siswa dalam kelas
  };

  // Fungsi untuk menampilkan modal
  const handleShow = () => {
    setErrorMessage(""); // Reset pesan error ketika modal dibuka
    if (modalInstance) {
      modalInstance.show(); // Tampilkan modal
    }
  };

  // Fungsi untuk menutup modal
  const handleClose = () => {
    if (modalInstance) {
      modalInstance.hide(); // Sembunyikan modal
      // Reset state ketika modal ditutup
      setSiswaId(""); // Reset pilihan siswa
      setErrorMessage(""); // Reset pesan error
    }
  };

  // Fungsi untuk menambah siswa ke kelas
  const handleTambah = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Cek jumlah siswa sebelum menambahkan siswa baru
      const jumlahSiswa = await getJumlahSiswaDiKelas();

      if (jumlahSiswa >= 32) { // Ganti 32 dengan batasan siswa yang diinginkan
        setErrorMessage("Maaf, kelas ini sudah penuh"); // Set pesan error jika limit tercapai
        return;
      }

      const formData = new FormData();
      formData.append("siswaId", siswaId);
      formData.append("kelasId", newkelasId);

      const res = await axios.post("/api/kelassiswa", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.pesan === "berhasil") {
        handleClose(); // Tutup modal setelah berhasil tambah
        alert(true);
        reload();
        setSiswaId(""); // Reset pilihan siswa setelah berhasil menambah
        getSiswaDiKelas(); // Ambil siswa yang sudah ada di kelas untuk memperbarui daftar
      }
    } catch (error) {
      console.log("Terjadi Kesalahan", error);
    }
  };

  return (
    <div>
      {/* Tombol untuk memunculkan modal */}
      <button onClick={handleShow} type="button" className="btn btn-success btn-icon-text">
        Tambah
      </button>

      {/* Modal Bootstrap */}
      <div className="modal fade" ref={modalRef} tabIndex={-1} aria-labelledby="tambahSiswaLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="tambahSiswaLabel">Tambah Siswa ke Kelas</h5>
              <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleTambah}>
                {errorMessage && (
                  <div className="alert alert-danger">{errorMessage}</div> // Pesan error jika kelas penuh
                )}
                <div className="mb-3">
                  <label htmlFor="siswaSelect" className="form-label">Pilih Siswa</label>
                  <select
                    id="siswaSelect"
                    className="form-select"
                    value={siswaId}
                    onChange={(e) => setSiswaId(e.target.value)}
                    required
                  >
                    <option value="" disabled selected>
                      Pilih Siswa
                    </option>
                    {listNama
                      .filter((item: any) => !existingSiswaIds.includes(item.id)) // Filter siswa yang sudah ada di kelas
                      .map((item: any, index) => (
                        <option key={index} value={item.id}>
                          {item.nama}
                        </option>
                      ))}
                  </select>
                  <small className="text-danger">
                    * Siswa Ini Ditambahkan Ke kelas yang dipilih tadi
                  </small>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-danger light" onClick={handleClose}>Close</button> 
                  <button className="btn btn-primary" type="submit">
                    Tambah
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tambah;
