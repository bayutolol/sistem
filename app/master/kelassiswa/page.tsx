"use client"; // Pastikan ini ada untuk menandakan ini adalah komponen klien
import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { IoClose } from "react-icons/io5";
import Tambah from "./action/Add";
import dynamic from 'next/dynamic'; // Untuk memuat komponen secara dinamis di klien

// Muat DataTable secara dinamis di klien
const DataTable = dynamic(() => import("react-data-table-component"), { ssr: false });
import * as XLSX from "xlsx"; // Import XLSX untuk ekspor ke Excel

const KelasSiswa = () => {
  const [kelas, setKelas] = useState([]); // Data kelas
  const [kelasSiswa, setKelasSiswa] = useState([]); // Data siswa dari semua kelas
  const [selected, setSelected] = useState(""); // Kelas yang dipilih
  const [filteredSiswa, setFilteredSiswa] = useState([]); // Siswa dari kelas yang dipilih
  const [alert, setAlert] = useState({ visible: false, message: "", type: "" }); // Alert state
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    loadKelas();
    getKelasSiswa();
  }, []);

  const loadKelas = async () => {
    const res = await axios.get("/api/kelas");
    setKelas(res.data);
  };

  const getKelasSiswa = async () => {
    const res = await axios.get("/api/kelassiswa");
    setKelasSiswa(res.data);
  };

  const filterSiswaByKelas = useCallback((kelasId: string) => {
    const siswaFiltered = kelasSiswa.filter(
      (ks: any) => ks.kelasId === parseInt(kelasId)
    );
    setFilteredSiswa(siswaFiltered);
  }, [kelasSiswa]);

  useEffect(() => {
    if (selected) {
      filterSiswaByKelas(selected); // Filter siswa saat kelas dipilih
    }
  }, [selected, filterSiswaByKelas]);

  const handleRowsPerPageChange = (newPerPage: number, page: number) => {
    setItemsPerPage(newPerPage);
    setCurrentPage(page);
  };

  const filteredItems = filteredSiswa.filter(
    (item: any) =>
      item.siswaTb?.nama &&
      item.siswaTb.nama.toLowerCase().includes(filterText.toLowerCase())
  );

  const columns = [
    {
      name: "No",
      cell: (row: any, index: number) => (
        <div>{(currentPage - 1) * itemsPerPage + index + 1}</div>
      ),
      sortable: false,
      width: "80px",
    },
    {
      name: "Nama siswa",
      selector: (row: any) => row.siswaTb?.nama,
    },
    {
      name: "Nama Kelas",
      selector: (row: any) => row.kelasTb?.nama,
    },
    {
      name: "Action",
      cell: (row: any) => (
        <div className="d-flex">
          <button
            className="btn btn-danger"
            onClick={() => handleDelete(row.id)}
          >
            Hapus
          </button>
        </div>
      ),
    },
  ];

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/api/kelassiswa/${id}`);
      reload();
      showAlert("Berhasil menghapus siswa.", "success");
    } catch (error) {
      console.error("Gagal menghapus siswa:", error);
      showAlert("Gagal menghapus siswa.", "danger");
    }
  };

  const reload = () => {
    getKelasSiswa();
    if (selected) {
      filterSiswaByKelas(selected);
    }
  };

  const showAlert = (message: string, type: string) => {
    setAlert({ visible: true, message, type });
    setTimeout(() => {
      setAlert({ visible: false, message: "", type: "" });
    }, 3000);
  };

  const handleExport = () => {
    const dataToExport = filteredSiswa.map((siswa: any) => {
      const rowData: any = {
        Nama: siswa.siswaTb?.nama,
        Kelas: siswa.kelasTb?.nama,
      };

      for (let i = 1; i <= 30; i++) {
        rowData[i] = "";
      }

      return rowData;
    });

    const workbook = XLSX.utils.book_new();
    const bulan = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];

    bulan.forEach((namaBulan) => {
      const worksheet = XLSX.utils.json_to_sheet(dataToExport, {
        header: ["Nama", "Kelas", ...Array.from({ length: 30 }, (_, i) => (i + 1).toString())],
      });
      XLSX.utils.book_append_sheet(workbook, worksheet, namaBulan);
    });

    XLSX.writeFile(workbook, "AbsensiSiswa.xlsx");
    showAlert("Data berhasil diekspor ke Excel.", "success");
  };

  return (
    <div className="container mt-5">
      <div className="card-header">
        <h1 className="card-title">Data Kelassiswa</h1>
      </div>

      <div className="row justify-content-between mb-4">
        <div className="col-md-6">
          <select
            className="form-select"
            style={{ height: '40px' }}
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            <option value={""} disabled selected>
              Pilih Kelas
            </option>
            {kelas.map((data: any) => (
              <option key={data.id} value={data.id}>
                {data.nama}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={!selected ? "d-none" : "d-flex justify-content-between mb-4"}>
        <div className="me-auto">
          <Tambah reload={reload} alert={setAlert} kelasId={selected} />
        </div>
        <div>
          <button className="btn btn-success" onClick={handleExport}>
            Export to Excel
          </button>
        </div>
      </div>

      {alert.visible && (
        <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
          <strong>{alert.message}</strong>
          <IoClose
            className="btn-close"
            onClick={() => setAlert({ ...alert, visible: false })}
            style={{ cursor: "pointer" }}
          />
        </div>
      )}

      <DataTable
        columns={columns}
        data={filteredItems}
        pagination
        persistTableHead
        responsive
        paginationPerPage={itemsPerPage}
        paginationTotalRows={filteredItems.length}
        onChangePage={(page) => setCurrentPage(page)}
        onChangeRowsPerPage={handleRowsPerPageChange}
        paginationRowsPerPageOptions={[5, 10, 20]}
        customStyles={{
          headRow: {
            style: {
              backgroundColor: "#53d0b2",
              fontSize: 15,
            },
          },
        }}
      />
    </div>
  );
};

export default KelasSiswa;
