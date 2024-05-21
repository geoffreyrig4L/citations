-- CreateTable
CREATE TABLE "Approved" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "approvedById" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Approved_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Approved" ADD CONSTRAINT "Approved_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Approved" ADD CONSTRAINT "Approved_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
