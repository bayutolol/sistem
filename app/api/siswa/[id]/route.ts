import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {
    const formData = await request.formData()
    const passwordbaru = String(formData.get('newpass'))

    if (passwordbaru === 'yes') {
        await prisma.siswaTb.update({
            where: { id: Number(params.id) },
            data: {
                nisn: String(formData.get('nisn')),
                nama: String(formData.get('nama')),
                jurusan: String(formData.get('jurusan')),
                jenisKelamin: String(formData.get('jenisKelamin')),
                agama: String(formData.get('agama')),
                tempatLahir: String(formData.get('tempatlahir')),
                tanggalLahir: String(formData.get('tanggallahir')),
                alamat: String(formData.get('alamat')),
                hp: String(formData.get('hp')),
            }
        })
    }

    await prisma.siswaTb.update({
        where: { id: Number(params.id) },
        data: {
            nisn: String(formData.get('nisn')),
            nama: String(formData.get('nama')),
            jurusan: String(formData.get('jurusan')),
            jenisKelamin: String(formData.get('jenisKelamin')),
            agama: String(formData.get('agama')),
            tempatLahir: String(formData.get('tempatlahir')),
            tanggalLahir: String(formData.get('tanggallahir')),
            alamat: String(formData.get('alamat')),
            hp: String(formData.get('hp')),
        }
    })

    return NextResponse.json({ pesan: 'berhasil' })
}

export const GET = async (request: Request, { params }: { params: { id: string } }) => {
    const siswa = await prisma.siswaTb.findUnique({
        where: { id: Number(params.id) },
    })
    return NextResponse.json(siswa, { status: 200 })
}

export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {
    const deletedSiswa = await prisma.siswaTb.delete({
        where: { id: Number(params.id) }
    })
    return NextResponse.json(deletedSiswa, { status: 200 })
}