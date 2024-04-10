/*
  Warnings:

  - You are about to drop the column `userId` on the `UserBookMark` table. All the data in the column will be lost.
  - Added the required column `userEmail` to the `UserBookMark` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserBookMark" DROP CONSTRAINT "UserBookMark_userId_fkey";

-- AlterTable
ALTER TABLE "UserBookMark" DROP COLUMN "userId",
ADD COLUMN     "userEmail" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "UserBookMark" ADD CONSTRAINT "UserBookMark_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
