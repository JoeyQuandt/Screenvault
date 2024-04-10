/*
  Warnings:

  - You are about to drop the column `bookmarkList` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_bookmarkList_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "bookmarkList";

-- CreateTable
CREATE TABLE "UserBookMark" (
    "userId" INTEGER NOT NULL,
    "id" SERIAL NOT NULL,
    "bookMarkId" INTEGER NOT NULL,

    CONSTRAINT "UserBookMark_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserBookMark_id_bookMarkId_key" ON "UserBookMark"("id", "bookMarkId");

-- AddForeignKey
ALTER TABLE "UserBookMark" ADD CONSTRAINT "UserBookMark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
