import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// PATCH request to update a student
export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {
  try {
    const formData = await request.formData();

    const updatedSiswa = await prisma.siswaTb.update({
      where: { id: Number(params.id) },
      data: {
        nisn: String(formData.get('nisn')),
        nama: String(formData.get('nama')),
        jurusan: String(formData.get('jurusan')),
        alamat: String(formData.get('alamat')),
        hp: String(formData.get('hp')),
        jenisKelamin: String(formData.get('jenisKelamin')),
        agama: String(formData.get('agama')),
        tempatLahir: String(formData.get('tempatlahir')),
        tanggalLahir: String(formData.get('tanggallahir')), // Pastikan ini adalah objek Date yang valid
      },
    });

    return NextResponse.json({ pesan: 'Data siswa berhasil diperbarui' }, { status: 200 });
  } catch (error) {
    console.error("Error in PATCH /api/siswa/:id: ", error);
    return NextResponse.json({ error: "Terjadi kesalahan saat memperbarui data siswa" }, { status: 500 });
  }
};

// GET request to retrieve a student by ID
export const GET = async (request: Request, { params }: { params: { id: string } }) => {
  const siswa = await prisma.siswaTb.findUnique({
    where: {
      id: Number(params.id),
    },
  });

  if (!siswa) {
    return NextResponse.json({ error: "Data siswa tidak ditemukan" }, { status: 404 });
  }

  return NextResponse.json(siswa);
};

// DELETE request to delete a student by ID
export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {
  try {
    await prisma.siswaTb.delete({
      where: {
        id: Number(params.id),
      },
    });

    return NextResponse.json({ pesan: "Data siswa berhasil dihapus" }, { status: 200 });
  } catch (error) {
    console.error("Error in DELETE /api/siswa/:id: ", error);
    return NextResponse.json({ error: "Terjadi kesalahan saat menghapus data siswa" }, { status: 500 });
  }
};
