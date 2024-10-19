"use client"
import { useState, SyntheticEvent, useEffect, useRef } from "react"
import axios from "axios"
import Modal from 'react-bootstrap/Modal';
import Swal from "sweetalert2";
// import Select from 'react-select'
// import { StyleSelect, tanggalHariIni } from "@/app/helper";

const options = [
    { value: 'Admin', label: 'Admin' },
    { value: 'Kasir', label: 'Kasir' },
    { value: 'Teknisi', label: 'Teknisi' },
];

function Add({ reload }: { reload: Function }) {
    const [nisn, setNisn] = useState("")
    const [nama, setNama] = useState("")
    const [jurusan, setJurusan] = useState("")
    const [tempatLahir, setTempatlahir] = useState("")
    const [tanggalLahir, setTanggallahir] = useState('')
    const [alamat, setAlamat] = useState("")
    const [hp, setHp] = useState("")
    const [email, setEmail] = useState("")
    const [status, setStatus] = useState("")
    const [show, setShow] = useState(false);
    const ref = useRef<HTMLInputElement>(null);
    const refemail = useRef<HTMLInputElement>(null);
    const refhp = useRef<HTMLInputElement>(null);
    const [selectjabatan, setSelectjabatan] = useState(null);
    const [st, setSt] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [jenisKelamin, setJenisKelamin] = useState("")
    const [agama, setAgama] = useState("")

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

    const handleClose = () => {
        setShow(false);
        clearForm();
    }

    const handleChange = (selectedOption: any) => {
        setSelectjabatan(selectedOption);
        setStatus(selectedOption.value);
    };

    const setfokusemail = () => {
        refemail.current?.focus();
    }

    const handleShow = () => setShow(true);

    useEffect(() => {
        ref.current?.focus();
    }, [])

    function clearForm() {
        setNisn('')
        setNama('')
        setJurusan('')
        setTempatlahir('')
        setTanggallahir('')
        setAlamat('')
        setHp('')
        setEmail('')
        setStatus('')
        setSelectjabatan(null)
        setSt(false)
        setJenisKelamin('')
        setAgama('')
    }

    const handleSubmit = async (e: SyntheticEvent) => {
        setIsLoading(true)
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append('nisn', nisn)
            formData.append('nama', nama)
            formData.append('jurusan', jurusan)
            formData.append('jenisKelamin', jenisKelamin)
            formData.append('agama', agama)
            formData.append('tempatlahir', tempatLahir)
            formData.append('tanggallahir', new Date(tanggalLahir).toISOString())
            formData.append('alamat', alamat)
            formData.append('hp', hp)
            formData.append('email', email)
            formData.append('status', status)

            const response = await axios.post(`/api/siswa`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            setIsLoading(false)

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
                        <Modal.Title>Tambah Data Siswa</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <div className="row">
                            <div className="mb-3 col-md-12">
                                <label className="col-sm-6 col-form-label">NISN</label>
                                <input
                                    autoFocus
                                    required
                                    type="text"
                                    className="form-control"
                                    value={nisn} onChange={(e) => setNisn(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="mb-3 col-md-6">
                                <label className="col-sm-6 col-form-label">Nama</label>
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    value={nama} onChange={(e) => setNama(e.target.value)}
                                />
                            </div>
                            <div className="row">
                            <div className="mb-3 col-md-6">
                                <label className="col-sm-6 col-form-label">Jurusan</label>
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    value={jurusan} onChange={(e) => setJurusan(e.target.value)}
                                />
                            </div>
                           
                        </div>
                            <div className="mb-3 col-md-6">
                                <label className="col-sm-6 col-form-label">Jenis Kelamin</label>
                                <select
                                    required
                                    className="form-control"
                                    value={jenisKelamin}
                                    onChange={(e) => setJenisKelamin(e.target.value)}
                                >
                                    <option value="">Pilih Jenis Kelamin</option>
                                    <option value="Laki-laki">Laki-laki</option>
                                    <option value="Perempuan">Perempuan</option>
                                </select>
                            </div>
                        </div>

                        <div className="mb-3 col-md-6">
                                <label className="col-sm-6 col-form-label">Agama</label>
                                <select
                                    required
                                    className="form-control"
                                    value={agama}
                                    onChange={(e) => setAgama(e.target.value)}
                                >
                                    <option value="">Pilih Agama</option>
                                    <option value="Islam">Islam</option>
                                    <option value="Kristen">Kristen</option>
                                    <option value="Hindu">Hindu</option>
                                    <option value="Budha">Budha</option>
                                    <option value="Konghucu">Konghucu</option>
                                </select>
                            </div>

                        <div className="row">
                            <div className="mb-3 col-md-6">
                                <label className="col-sm-6 col-form-label">Tempat lahir</label>
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    value={tempatLahir} onChange={(e) => setTempatlahir(e.target.value)}
                                />
                            </div>
                           
                        </div>

                        <div className="row">
                            <div className="mb-3 col-md-6">
                                <label className="col-sm-6 col-form-label" >Tanggal lahir</label>
                                <input
                                    required
                                    type="date"
                                    className="form-control"
                                    value={tanggalLahir} onChange={(e) => setTanggallahir(e.target.value)}
                                />
                            </div>
                            <div className="mb-3 col-md-6">
                                <label className="col-sm-6 col-form-label">Alamat</label>
                                <div className="input-group">
                                    <input
                                        required
                                        type="text"
                                        className="form-control"
                                        aria-label="Recipient's username"
                                        aria-describedby="basic-addon2"
                                        value={alamat} onChange={(e) => setAlamat(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="mb-3 col-md-12">
                                <label className="col-sm-6 col-form-label">HP</label>
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    value={hp} onChange={(e) => setHp(e.target.value)}
                                />
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