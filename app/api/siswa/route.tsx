import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient()

export const POST = async (request: Request) => {
    const formData = await request.formData()

    await prisma.siswaTb.create({
        data: {
            nisn: String(formData.get('nisn')),
            nama: String(formData.get('nama')),
            jurusan: String(formData.get('jurusan')),
            alamat: String(formData.get('alamat')),
            hp: String(formData.get('hp')),
            jenisKelamin: String(formData.get('jenisKelamin')),
            agama: String(formData.get('agama')),
            tempatLahir: String(formData.get('tempatlahir')),
            tanggalLahir: String(formData.get('tanggallahir')),
        }
    })

    return NextResponse.json({ pesan: 'berhasil' })
}


export const GET = async () => {
    const siswa = await prisma.siswaTb.findMany({
        // where:{
        //         agama:'Islam'
        // },
        orderBy: {
            id: "asc"
        }
    });
    return NextResponse.json(siswa, { status: 200 })
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { notInClass } = req.query;
  
    try {
      if (typeof notInClass !== 'string') {
        return res.status(400).json({ error: 'Invalid kelasId' });
      }
  
      const siswa = await prisma.siswaTb.findMany({
        where: {
          NOT: {
            kelassiswaTb: {
              some: {
                kelasId: parseInt(notInClass, 10),
              },
            },
          },
        },
      });
  
      res.status(200).json(siswa);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching siswa data' });
    }
  }