/*
  Warnings:

  - You are about to drop the `UserBookMark` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserBookMark" DROP CONSTRAINT "UserBookMark_userEmail_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bookmarkList" INTEGER[];

-- DropTable
DROP TABLE "UserBookMark";
