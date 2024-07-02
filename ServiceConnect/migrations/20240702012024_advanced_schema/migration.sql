/*
  Warnings:

  - Added the required column `category` to the `JobAd` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `JobAd` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `JobAd` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `JobAd` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "JobAd" ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "duration" INTEGER NOT NULL,
ADD COLUMN     "numberOfRooms" DOUBLE PRECISION,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "toolsProvided" BOOLEAN,
ADD COLUMN     "youngestChildAge" INTEGER;
