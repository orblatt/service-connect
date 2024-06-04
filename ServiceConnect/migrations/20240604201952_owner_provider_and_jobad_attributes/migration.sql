/*
  Warnings:

  - You are about to drop the column `userId` on the `JobAd` table. All the data in the column will be lost.
  - Added the required column `ownerId` to the `JobAd` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `JobAd` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_JobAd" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "isDone" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ownerId" INTEGER NOT NULL,
    "providerId" INTEGER,
    CONSTRAINT "JobAd_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "JobAd_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_JobAd" ("description", "id", "isDone") SELECT "description", "id", "isDone" FROM "JobAd";
DROP TABLE "JobAd";
ALTER TABLE "new_JobAd" RENAME TO "JobAd";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
