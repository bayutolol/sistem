import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
const MAX_SISWA_PER_KELAS = 32; // Batas maksimal siswa dalam kelas

export async function POST(request: Request) {
  const formData = await request.formData();
  const kelasId = Number(formData.get("kelasId")); // Mengambil ID kelas dari form data
  const siswaId = Number(formData.get("siswaId")); // Mengambil ID siswa dari form data

  // Mengecek jumlah siswa di kelas tersebut
  const jumlahSiswa = await prisma.kelassiswaTb.count({
    where: {
      kelasId: kelasId, // Menghitung siswa berdasarkan kelas ID
    },
  });

  // Jika jumlah siswa sudah mencapai batas, kirim respons error
  if (jumlahSiswa >= MAX_SISWA_PER_KELAS) {
    return NextResponse.json(
      { pesan: "Maaf, kelas ini sudah penuh" },
      { status: 400 } // Kode status 400 untuk Bad Request
    );
  }

  // Jika belum penuh, tambahkan siswa ke kelas
  await prisma.kelassiswaTb.create({
    data: {
      kelasId: kelasId, // Menyimpan ID kelas
      siswaId: siswaId, // Menyimpan ID siswa
    },
  });

  return NextResponse.json({ pesan: "berhasil" }); // Mengembalikan respons berhasil
}

export async function GET() {
  const res = await prisma.kelassiswaTb.findMany({
    orderBy: {
      id: "asc", // Mengurutkan hasil berdasarkan ID
    },
    include: {
      kelasTb: true, // Mengambil data kelas terkait
      siswaTb: true, // Mengambil data siswa terkait
    },
  });

  return NextResponse.json(res); // Mengembalikan daftar siswa dalam kelas
}
