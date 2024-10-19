/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, SyntheticEvent, useEffect } from "react";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import Swal from "sweetalert2";
import moment from "moment";
import { kelasTb } from "@prisma/client";

function Update({ kelas, reload }: { kelas: kelasTb, reload: Function }) {

    const [nama, setNama] = useState(kelas.nama);
    const [guruId, setGuruid] = useState(kelas.guruId);
    const [dataguru, setDataguru] = useState([]);
    const [st, setSt] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [show, setShow] = useState(false);

    

    const refreshForm = () => {
        setNama(kelas.nama);
        setNama(kelas.nama);

    };

    const handleClose = () => {
        setShow(false);
        refreshForm();
    };

    useEffect(() => {
        loadkelas()
    }, [])
    const loadkelas = async () => {
        const response = await axios.get("/api/guru")
        const hasil = await response.data
        setDataguru(hasil)
    }

    const handleShow = () => setShow(true);

    const handleUpdate = async (event: SyntheticEvent) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const formData = new FormData();
            formData.append('nama', nama);
            formData.append('guruId', String(guruId));


            setIsLoading(false);

            const xxx = await axios.patch(`/api/kelas/${kelas.id}`, formData, {
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
                                <label className="col-sm-6 col-form-label">nama</label>
                                <input
                                    autoFocus
                                    required
                                    type="text"
                                    className="form-control"
                                    value={nama}
                                    onChange={(e) => setNama(e.target.value)}
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
                                    onChange={(e) => setGuruid(Number(e.target.value))} 
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
