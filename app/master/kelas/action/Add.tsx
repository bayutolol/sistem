"use client"
import { useState, SyntheticEvent, useEffect, useRef } from "react"
import axios from "axios"
import Modal from 'react-bootstrap/Modal';
import Swal from "sweetalert2";

// import Select from 'react-select'
// import { StyleSelect, tanggalHariIni } from "@/app/helper";

function Add({ reload }: { reload: Function }) {
    const [nama, setNama] = useState("")
    const [guruId, setGuruid] = useState("")
    const [dataguru, setDataguru] = useState([]);
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false)

    const handleClose = () => {
        setShow(false);
        clearForm();
    }
    useEffect(() => {
        loadguru()
    }, [])
    const loadguru = async () => {
        const response = await axios.get("/api/guru")
        const hasil = await response.data
        setDataguru(hasil)
    }


    if (isLoading) {
        Swal.fire({
            title: "Mohon tunggu!",
            html: "Sedang mengirim data ke server",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        })
    }
    const handleShow = () => setShow(true);

    function clearForm() {
        setNama('')
        setGuruid('')
    }

    const tes = (e: any) => {
        setGuruid(e.target.value)
        console.log('id guru',e.target.value)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setIsLoading(true)
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append('nama', nama)
            formData.append('guruId', guruId)

            const response = await axios.post(`/api/kelas`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            setIsLoading(false)
            if (response.data.pesan === 'guru sudah terdaftar') {
                Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: 'Guru sudah terdaftar di kelas lain',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
            if (response.data.pesan === 'berhasil') {
                handleClose();
                clearForm();
                reload()
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Berhasil Simpan',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        } catch (error) {
            setIsLoading(false)
            console.error('Error:', error);
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Terjadi kesalahan',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }

    return (
        <>
            <button onClick={handleShow} type="button" className="btn btn-success btn-icon-text">
                Tambah
            </button>
            <Modal
                dialogClassName="modal-lg"
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <form onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Tambah data kelas</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <div className="row">
                            <div className="mb-3 col-md-12">
                                <label className="col-sm-6 col-form-label">Nama kelas</label>
                                <input
                                    autoFocus
                                    required
                                    type="text"
                                    className="form-control"
                                    value={nama} onChange={(e) => setNama(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="mb-3 col-md-12">
                                <label className="col-sm-6 col-form-label">PILIH GURU</label>
                                <select
                                    required
                                    className="form-control"
                                    value={guruId}
                                    onChange={(e) => setGuruid(e.target.value)} 

                                >
                                    <option value="">Pilihan</option>
                                    {dataguru.map((a: any) => (
                                        <option key={a.id} value={a.id}>{a.nama}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </Modal.Body>

                    <Modal.Footer>
                        <button type="button" className="btn btn-danger light" onClick={handleClose}>Close</button>
                        <button type="submit" className="btn btn-primary light">Simpan</button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
}

export default Add;


