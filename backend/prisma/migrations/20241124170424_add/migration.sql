/*
  Warnings:

  - Added the required column `min_km` to the `drivers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "drivers" ADD COLUMN     "min_km" INTEGER NOT NULL;
