import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export const POST = async (request: Request) => {

    const formData = await request.formData();
    const x = await prisma.kelasTb.findUnique({
        where: {
            guruId: Number(formData.get('guruId')),
        }
    })

    
    if (x !== null) {
        return NextResponse.json({ pesan: 'guru sudah terdaftar' });
    }

    await prisma.kelasTb.create({
        data: {
            nama: String(formData.get('nama')),
            guruId: Number(formData.get('guruId')),
            tahunajaran: String(formData.get('tahunajaran')),
        }
    });



    return NextResponse.json({ pesan: 'berhasil' });

};

export const GET = async () => {
    try {
        const guru = await prisma.kelasTb.findMany({
            orderBy: {
                id: "asc"
            },
            include:{
                guruTb:true,
            }
        });

        return NextResponse.json(guru, { status: 200 });
    } catch (error: any) {
        console.error('Error fetching guru:', error);
        return NextResponse.json({ pesan: 'gagal', error: error.message }, { status: 500 });
    }
};


