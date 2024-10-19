"use client";
import React, { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import 'bootstrap/dist/css/bootstrap.min.css';

// Pastikan semua komponen Chart.js terdaftar
Chart.register(...registerables);

const HomePage = () => {
  const [totalSiswa, setTotalSiswa] = useState(0);
  const [totalGuru, setTotalGuru] = useState(0);
  const [totalKelas, setTotalKelas] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart | null>(null);

  // Fungsi untuk mengambil data dari API atau Prisma
  const fetchData = async () => {
    try {
      // Ganti dengan API endpoint atau query Prisma untuk mengambil data total siswa, guru, dan kelas
      const responseSiswa = await fetch('/api/siswa');
      const dataSiswa = await responseSiswa.json();
      setTotalSiswa(dataSiswa.length);

      const responseGuru = await fetch('/api/guru');
      const dataGuru = await responseGuru.json();
      setTotalGuru(dataGuru.length);

      const responseKelas = await fetch('/api/kelas');
      const dataKelas = await responseKelas.json();
      setTotalKelas(dataKelas.length);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    // Panggil fetchData untuk mengambil data dinamis
    fetchData();

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        if (chartRef.current) {
          chartRef.current.destroy();
        }

        chartRef.current = new Chart(ctx, {
          type: 'line',
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
              label: 'Pendaftaran Siswa Baru',
              data: [30, 20, 50, 40, 70, 60, 90, 80, 100, 110, 90, 120],
              fill: true,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              tension: 0.1
            }]
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      }
    }

    // Cleanup saat komponen unmount
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="container py-4">
      <h2 className="text-center text-muted mb-5">Sistem Informasi Sekolah</h2>

      {/* Statistik cards */}
      <div className="row text-center mb-5">
        <div className="col-md-4">
          <div className="card text-white bg-primary mb-3">
            <div className="card-body">
              <h5 className="card-title">Total Siswa</h5>
              <p className="card-text">{totalSiswa}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-success mb-3">
            <div className="card-body">
              <h5 className="card-title">Total Guru</h5>
              <p className="card-text">{totalGuru}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-warning mb-3">
            <div className="card-body">
              <h5 className="card-title">Total Kelas</h5>
              <p className="card-text">{totalKelas}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Grafik statistik */}
      <div className="card">
        <div className="card-body">
          <h5 className="card-title text-center">Statistik Pendaftaran Siswa Baru</h5>
          <canvas ref={canvasRef} id="schoolChart" height="100"></canvas>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-5">
        <p className="text-center text-muted">&copy; 2024 Sistem Informasi Sekolah</p>
      </footer>
    </div>
  );
};

export default HomePage;
