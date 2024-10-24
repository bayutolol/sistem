import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// POST request to add a new student
export const POST = async (request: Request) => {
  try {
    const formData = await request.formData();

    // Extract data from formData
    const newSiswa = {
      nisn: String(formData.get('nisn')),
      nama: String(formData.get('nama')),
      jurusan: String(formData.get('jurusan')),
      alamat: String(formData.get('alamat')),
      hp: String(formData.get('hp')),
      jenisKelamin: String(formData.get('jenisKelamin')),
      agama: String(formData.get('agama')),
      tempatLahir: String(formData.get('tempatlahir')),
      tanggalLahir: String(formData.get('tanggallahir')),
    };

    // Create new student in database
    await prisma.siswaTb.create({
      data: newSiswa,
    });

    return NextResponse.json({ pesan: "Data siswa berhasil ditambahkan" }, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/siswa: ", error);
    return NextResponse.json({ error: "Terjadi kesalahan saat menambahkan data siswa" }, { status: 500 });
  }
};

// GET request to retrieve all students
export const GET = async () => {
  try {
    const siswa = await prisma.siswaTb.findMany({
      orderBy: {
        id: "asc",
      },
    });
    return NextResponse.json(siswa, { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/siswa: ", error);
    return NextResponse.json({ error: "Terjadi kesalahan saat mengambil data siswa" }, { status: 500 });
  }
};
