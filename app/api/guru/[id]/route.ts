import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {
    const formData = await request.formData()



    await prisma.guruTb.update({
        where: { id: Number(params.id) },
        data: {
            nip: String(formData.get('nip')),
            nama: String(formData.get('nama')),
            mataPelajaran: String(formData.get('mataPelajaran')),
            hp: String(formData.get('hp')),
            tempatLahir: String(formData.get('tempatLahir')),
            tanggalLahir: String(formData.get('tanggalLahir')),
            alamat: String(formData.get('alamat')),
        }
    })

    return NextResponse.json({ pesan: 'berhasil' })
}

export const GET = async (request: Request, { params }: { params: { id: string } }) => {
    const guru = await prisma.guruTb.findUnique({
        where: { id: Number(params.id) },
    })
    return NextResponse.json(guru, { status: 200 })
}

export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {
    const deletedGuru = await prisma.guruTb.delete({
        where: { id: Number(params.id) }
    })
    return NextResponse.json(deletedGuru, { status: 200 })
}