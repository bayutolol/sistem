/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, SyntheticEvent } from "react";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import Swal from "sweetalert2";
import moment from "moment";
import { guruTb } from "@prisma/client";

function Update({ guru, reload }: { guru: guruTb, reload: Function }) {

    const [nip, setNip] = useState(guru.nip);
    const [nama, setNama] = useState(guru.nama);
    const [mataPelajaran, setMatapelajaran] = useState(guru.mataPelajaran);
    const [hp, setHp] = useState(guru.hp);
    const [tempatLahir, setTempatlahir] = useState(guru.tempatLahir);
    const [tanggalLahir, setTanggallahir] = useState(moment(guru.tanggalLahir).format("YYYY-MM-DD"));
    const [alamat, setAlamat] = useState(guru.alamat);
    const [st, setSt] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [show, setShow] = useState(false);

    const refreshForm = () => {
        setNip(guru.nip);
        setNama(guru.nama);
        setMatapelajaran(guru.mataPelajaran);
        setTempatlahir(guru.tempatLahir);
        setTanggallahir(moment(guru.tanggalLahir).format("YYYY-MM-DD"));
        setAlamat(guru.alamat);

    };

    const handleClose = () => {
        setShow(false);
        refreshForm();
    };

    const handleShow = () => setShow(true);

    const handleUpdate = async (event: SyntheticEvent) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const formData = new FormData();
            formData.append('nip', nip);
            formData.append('nama', nama);
            formData.append('mataPelajaran', mataPelajaran);
            formData.append('hp', hp);
            formData.append('tempatLahir', tempatLahir);
            formData.append('tanggalLahir', new Date(tanggalLahir).toISOString());
            formData.append('alamat', alamat);


            setIsLoading(false);

            const xxx = await axios.patch(`/api/guru/${guru.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }) // Ensure you have the correct endpoint
            if (xxx.data.pesan === 'berhasil') {
                setShow(false);
                reload();
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Berhasil diubah',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            setIsLoading(false);
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            });
        }
    };

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
                        <Modal.Title>Edit Data Guru</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row">
                            <div className="mb-3 col-md-12">
                                <label className="col-sm-6 col-form-label">NIP</label>
                                <input
                                    autoFocus
                                    required
                                    type="text"
                                    className="form-control"
                                    value={nip}
                                    onChange={(e) => setNip(e.target.value)}
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
                                    value={nama}
                                    onChange={(e) => setNama(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="mb-3 col-md-6">
                                <label className="col-sm-6 col-form-label">Tempat Lahir</label>
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    value={tempatLahir}
                                    onChange={(e) => setTempatlahir(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="mb-3 col-md-6">
                                <label className="col-sm-6 col-form-label">Tanggal Lahir</label>
                                <input
                                    required
                                    type="date"
                                    className="form-control"
                                    value={tanggalLahir}
                                    onChange={(e) => setTanggallahir(e.target.value)}
                                />
                            </div>
                            <div className="mb-3 col-md-6">
                                <label className="col-sm-6 col-form-label">Alamat</label>
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    value={alamat}
                                    onChange={(e) => setAlamat(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="mb-3 col-md-12">
                                <label className="col-sm-6 col-form-label">HP</label>
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    value={hp}
                                    onChange={(e) => setHp(e.target.value)}
                                />
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="submit" className="btn btn-primary" disabled={isLoading}>
                            {isLoading ? 'Updating...' : 'Update'}
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    );
}

export default Update;
