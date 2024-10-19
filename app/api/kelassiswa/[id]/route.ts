import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        // Hapus data kelas siswa berdasarkan id
        const kelassiswa = await prisma.kelassiswaTb.delete({
            where: { id: Number(id) },
        });

        return NextResponse.json({ message: 'Data berhasil dihapus', kelassiswa }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Terjadi kesalahan saat menghapus data', error }, { status: 500 });
    }
}
