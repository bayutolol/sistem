"use client";
import { useState } from "react";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import Swal from "sweetalert2";

function Delete({ siswaid, reload }: { siswaid: number; reload: Function }) {
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDelete = async () => {
        setIsLoading(true);
        handleClose();

        try {
            await axios.delete(`/api/siswa/${siswaid}`);

            // Tampilkan pesan sukses
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Berhasil dihapus',
                showConfirmButton: false,
                timer: 1500,
            });

            // Memanggil fungsi reload untuk memperbarui daftar
            reload();
        } catch (error) {
            console.error('Error:', error);
            // Tampilkan pesan kesalahan jika terjadi kesalahan
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Terjadi kesalahan saat menghapus data!',
            });
        } finally {
            setIsLoading(false);
        }
    };

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
                keyboard={false}
            >
                <Modal.Body>
                    <h6 className="font-bold">Anda yakin menghapus data ini?</h6>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-warning light" onClick={handleClose}>Close</button>
                    <button type="button" className="btn btn-danger light" onClick={handleDelete} disabled={isLoading}>
                        {isLoading ? "Menghapus..." : "Ya, Hapus"}
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Delete;
