-- CreateTable
CREATE TABLE "SearchProfile" (
    "id" SERIAL NOT NULL,
    "emails" TEXT[],
    "interval" TEXT NOT NULL,
    "minPrice" DOUBLE PRECISION NOT NULL,
    "maxPrice" DOUBLE PRECISION NOT NULL,
    "isDone" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "searcherId" INTEGER NOT NULL,

    CONSTRAINT "SearchProfile_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SearchProfile" ADD CONSTRAINT "SearchProfile_searcherId_fkey" FOREIGN KEY ("searcherId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
