/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Reply` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Reply_userId_commentId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Reply_userId_key" ON "Reply"("userId");
