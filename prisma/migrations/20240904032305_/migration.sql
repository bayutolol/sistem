/*
  Warnings:

  - You are about to drop the column `tahunAjaran` on the `kelassiswaTb` table. All the data in the column will be lost.
  - Added the required column `tahunajaran` to the `kelassiswaTb` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "kelassiswaTb" DROP COLUMN "tahunAjaran",
ADD COLUMN     "tahunajaran" TEXT NOT NULL;
