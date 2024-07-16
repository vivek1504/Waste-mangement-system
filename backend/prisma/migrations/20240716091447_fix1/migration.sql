-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_complaintId_fkey";

-- AlterTable
ALTER TABLE "Address" ALTER COLUMN "complaintId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_complaintId_fkey" FOREIGN KEY ("complaintId") REFERENCES "Complaint"("id") ON DELETE SET NULL ON UPDATE CASCADE;
