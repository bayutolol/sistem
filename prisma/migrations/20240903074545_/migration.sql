-- CreateTable
CREATE TABLE "kelasTb" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "guruId" INTEGER NOT NULL,
    "tahunajaran" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "kelasTb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "siswaTb" (
    "id" SERIAL NOT NULL,
    "nisn" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "jenisKelamin" TEXT NOT NULL,
    "agama" TEXT NOT NULL,
    "tempatLahir" TEXT NOT NULL,
    "tanggalLahir" TIMESTAMP(3) NOT NULL,
    "alamat" TEXT NOT NULL,
    "hp" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "siswaTb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kelassiswaTb" (
    "id" SERIAL NOT NULL,
    "kelasId" INTEGER NOT NULL,
    "siswaId" INTEGER NOT NULL,
    "tahunAjaran" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "kelassiswaTb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guruTb" (
    "id" SERIAL NOT NULL,
    "nip" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "mataPelajaran" TEXT NOT NULL,
    "hp" TEXT NOT NULL,
    "tempatLahir" TEXT NOT NULL,
    "tanggalLahir" TIMESTAMP(3) NOT NULL,
    "alamat" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "guruTb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mataPelajaranTb" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mataPelajaranTb_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "kelasTb_guruId_key" ON "kelasTb"("guruId");

-- AddForeignKey
ALTER TABLE "kelasTb" ADD CONSTRAINT "kelasTb_guruId_fkey" FOREIGN KEY ("guruId") REFERENCES "guruTb"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kelassiswaTb" ADD CONSTRAINT "kelassiswaTb_kelasId_fkey" FOREIGN KEY ("kelasId") REFERENCES "kelasTb"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kelassiswaTb" ADD CONSTRAINT "kelassiswaTb_siswaId_fkey" FOREIGN KEY ("siswaId") REFERENCES "siswaTb"("id") ON DELETE CASCADE ON UPDATE CASCADE;
