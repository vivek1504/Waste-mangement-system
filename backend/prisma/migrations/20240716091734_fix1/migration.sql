-- DropForeignKey
ALTER TABLE "Complaint" DROP CONSTRAINT "Complaint_cleanerId_fkey";

-- AlterTable
ALTER TABLE "Complaint" ALTER COLUMN "cleanerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Complaint" ADD CONSTRAINT "Complaint_cleanerId_fkey" FOREIGN KEY ("cleanerId") REFERENCES "Cleaner"("id") ON DELETE SET NULL ON UPDATE CASCADE;
