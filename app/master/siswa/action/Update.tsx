/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client"
import { useState, SyntheticEvent } from "react"
import {  siswaTb } from "@prisma/client"
import axios from "axios"
import Modal from 'react-bootstrap/Modal';
import Swal from "sweetalert2"
import moment from "moment"
import Siswa from "../page";
// import { StyleSelect } from "@/app/helper";


function Update({ siswa,  reload }: { siswa: siswaTb, reload: Function }) {

    const [nisn, setNisn] = useState(siswa.nisn)
    const [nama, setNama] = useState(siswa.nama)
    const [jurusan, setJurusan] = useState(siswa.jurusan)
    const [jenisKelamin, setjenisKelamin] = useState(siswa.jenisKelamin)
    const [agama, setAgama] = useState(siswa.agama)
    const [tempatLahir, setTempatlahir] = useState(siswa.tempatLahir)
    const [tanggalLahir, setTanggallahir] = useState(moment(siswa.tanggalLahir).format("YYYY-MM-DD"))
    const [alamat, setAlamat] = useState(siswa.alamat)
    const [hp, setHp] = useState(siswa.hp)
    const [st, setSt] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
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

    const refreshform = () => {
        setNisn(siswa.nisn)
        setNama(siswa.nama)
        setJurusan(siswa.jurusan)
        setjenisKelamin(siswa.jenisKelamin)
        setAgama(siswa.agama)
        setTempatlahir(siswa.tempatLahir)
        setTanggallahir(moment(siswa.tanggalLahir).format("YYYY-MM-DD"))
        setAlamat(siswa.alamat)
        setHp(siswa.hp)
    }

    const [show, setShow] = useState(false)

    const handleClose = () => {
        setShow(false);
        refreshform()
    }

    const handleShow = () => setShow(true)

    const handleUpdate = async (e: SyntheticEvent) => {
        setIsLoading(true)
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append('nisn', nisn)
            formData.append('nama', nama)
            formData.append('jurusan', jurusan)
            formData.append('tempatlahir', tempatLahir)
            formData.append('tanggallahir', new Date(tanggalLahir).toISOString())
            formData.append('alamat', alamat)
            formData.append('hp', hp)
            formData.append('jenisKelamin', jenisKelamin)
            formData.append('agama', agama)

            const xxx = await axios.patch(`/api/siswa/${siswa.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            setTimeout(function () {

                if (xxx.data.pesan == 'sudah ada hp') {
                    setIsLoading(false)
                    Swal.fire({
                        position: 'top-end',
                        icon: 'warning',
                        title: 'No Hp ini sudah terdaftar',
                        showConfirmButton: false,
                        timer: 1500
                    })

                }

            }, 1500);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div>
            <span onClick={handleShow} className="btn btn-success shadow btn-xs sharp mx-1"><i className="fa fa-edit"></i></span>
            <Modal
                dialogClassName="modal-lg"
                show={show}
                onHide={handleClose}
                backdrop="static"
            >
                <form onSubmit={handleUpdate}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Data Siswa</Modal.Title>
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
                            <div className="mb-3 col-md-6">
                                <label className="col-sm-6 col-form-label">Jurusan</label>
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    value={jurusan} onChange={(e) => setJurusan(e.target.value)}
                                />
                            </div>
                            <div className="mb-3 col-md-6">
                                <label className="col-sm-6 col-form-label">Jenis Kelamin</label>
                                <select
                                    required
                                    className="form-control"
                                    value={jenisKelamin}
                                    onChange={(e) => setjenisKelamin(e.target.value)}
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
                        <button type="submit" className="btn btn-primary">Update</button>
                        <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    )
}

export default Update