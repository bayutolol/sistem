import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {
    const formData = await request.formData()



    await prisma.kelasTb.update({
        where: { id: Number(params.id) },
        data: {
            nama: String(formData.get('nama')),
            guruId: Number(formData.get('guruId')),
            tahunajaran: String(formData.get('tahunajaran')),
        }
    })

    return NextResponse.json({ pesan: 'berhasil' })
}

export const GET = async (request: Request, { params }: { params: { id: string } }) => {
    const kelas = await prisma.kelasTb.findUnique({
        where: { id: Number(params.id) },
    })
    return NextResponse.json(kelas, { status: 200 })
}

export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {
    const deletedkelas = await prisma.kelasTb.delete({
        where: { id: Number(params.id) }
    })
    return NextResponse.json(deletedkelas, { status: 200 })
}