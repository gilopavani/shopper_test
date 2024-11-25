-- CreateTable
CREATE TABLE "race_approval_points" (
    "id" SERIAL NOT NULL,
    "customerId" INTEGER NOT NULL,
    "origin" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "distance" DOUBLE PRECISION NOT NULL,
    "duration" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "driverId" INTEGER NOT NULL,

    CONSTRAINT "race_approval_points_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "race_approval_points" ADD CONSTRAINT "race_approval_points_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "drivers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
