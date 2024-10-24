"use client"
import { useState } from "react"
import axios from "axios"
import Modal from 'react-bootstrap/Modal';
import Swal from "sweetalert2";

function Delete({ kelassiswaid, reload }: { kelassiswaid: Number, reload: Function }) {
    const [show, setShow] = useState(false); // State untuk menampilkan modal
    const handleClose = () => setShow(false); // Fungsi untuk menutup modal
    const handleShow = () => setShow(true); // Fungsi untuk menampilkan modal

    const [isLoading, setIsLoading] = useState(false); // State untuk mengelola status loading
    if (isLoading) {
        Swal.fire({
            title: "Mohon tunggu!",
            html: "Sedang mengirim data ke server",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading(); // Menampilkan loading saat sedang menghapus
            },
        })
    }

    const handleDelete = async () => {
        setIsLoading(true); // Set status loading menjadi true
        handleClose(); // Menutup modal
        await axios.delete(`/api/kelassiswa/${kelassiswaid}`); // Mengirim permintaan DELETE ke API

        setTimeout(function () {
            reload(); // Memanggil fungsi reload setelah penghapusan
            setIsLoading(false); // Mengatur loading menjadi false
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Berhasil dihapus', // Menampilkan pesan sukses
                showConfirmButton: false,
                timer: 1500
            })
        }, 1500);
    }

    return (
        <div>
            <span onClick={handleShow} className="btn btn-danger shadow btn-xs sharp mx-1">
                <i className="fa fa-trash"></i>
            </span>
            <Modal
                dialogClassName="modal-md"
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}>
                <Modal.Body>
                    <h6 className="font-bold">Anda yakin menghapus data ini ?</h6>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-warning light" onClick={handleClose}>Close</button>
                    <button type="button" className="btn btn-danger light" onClick={handleDelete}>Ya, Hapus</button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Delete;
