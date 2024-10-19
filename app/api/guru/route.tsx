import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const POST = async (request: Request) => {
 
        const formData = await request.formData();
        const newGuru = await prisma.guruTb.create({
            data: {
                nip: String(formData.get('nip')),
                nama: formData.get('nama') as string,
                mataPelajaran: formData.get('mataPelajaran') as string,
                hp: String(formData.get('hp')),
                tempatLahir: String(formData.get('tempatlahir')),
                tanggalLahir: String(formData.get('tanggallahir')),
                alamat: String(formData.get('alamat')),
            }
        });

        return NextResponse.json({ pesan: 'berhasil'});

};

export const GET = async () => {
    try {
        const guru = await prisma.guruTb.findMany({
            orderBy: {
                id: "asc"
            },
        });

        return NextResponse.json(guru, { status: 200 });
    } catch (error: any) {
        console.error('Error fetching guru:', error);
        return NextResponse.json({ pesan: 'gagal', error: error.message }, { status: 500 });
    }
};
