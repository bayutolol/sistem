import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
const MAX_SISWA_PER_KELAS = 32; // Batas maksimal siswa dalam kelas

export async function POST(request: Request) {
  const formData = await request.formData();
  const kelasId = Number(formData.get("kelasId"));
  const siswaId = Number(formData.get("siswaId"));

  // Mengecek jumlah siswa di kelas tersebut
  const jumlahSiswa = await prisma.kelassiswaTb.count({
    where: {
      kelasId: kelasId,
    },
  });

  // Jika jumlah siswa sudah mencapai batas, kirim respons error
  if (jumlahSiswa >= MAX_SISWA_PER_KELAS) {
    return NextResponse.json(
      { pesan: "Maaf, kelas ini sudah penuh" },
      { status: 400 }
    );
  }

  // Jika belum penuh, tambahkan siswa ke kelas
  await prisma.kelassiswaTb.create({
    data: {
      kelasId: kelasId,
      siswaId: siswaId,
    },
  });

  return NextResponse.json({ pesan: "berhasil" });
}

export async function GET() {
  const res = await prisma.kelassiswaTb.findMany({
    orderBy: {
      id: "asc",
    },
    include: {
      kelasTb: true,
      siswaTb: true,
    },
  });

  return NextResponse.json(res);
}
