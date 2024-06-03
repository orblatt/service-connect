-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_JobAd" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "isDone" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER,
    CONSTRAINT "JobAd_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_JobAd" ("description", "id", "isDone") SELECT "description", "id", "isDone" FROM "JobAd";
DROP TABLE "JobAd";
ALTER TABLE "new_JobAd" RENAME TO "JobAd";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
