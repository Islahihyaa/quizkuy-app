/*
  Warnings:

  - The primary key for the `question` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `incorrect_answers` on the `question` table. All the data in the column will be lost.
  - You are about to drop the column `questions_id` on the `question` table. All the data in the column will be lost.
  - You are about to drop the column `quiz_id` on the `question` table. All the data in the column will be lost.
  - The primary key for the `quiz` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `category` on the `quiz` table. All the data in the column will be lost.
  - You are about to drop the column `difficulty` on the `quiz` table. All the data in the column will be lost.
  - You are about to drop the column `quiz_id` on the `quiz` table. All the data in the column will be lost.
  - You are about to drop the `_userquizzes` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `category` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `difficulty` to the `Question` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `Question` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `quizId` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Question` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `Quiz` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `response_code` to the `Quiz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Quiz` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_userquizzes` DROP FOREIGN KEY `_UserQuizzes_A_fkey`;

-- DropForeignKey
ALTER TABLE `_userquizzes` DROP FOREIGN KEY `_UserQuizzes_B_fkey`;

-- DropForeignKey
ALTER TABLE `question` DROP FOREIGN KEY `Question_quiz_id_fkey`;

-- AlterTable
ALTER TABLE `question` DROP PRIMARY KEY,
    DROP COLUMN `incorrect_answers`,
    DROP COLUMN `questions_id`,
    DROP COLUMN `quiz_id`,
    ADD COLUMN `category` VARCHAR(191) NOT NULL,
    ADD COLUMN `difficulty` VARCHAR(191) NOT NULL,
    ADD COLUMN `id` VARCHAR(191) NOT NULL,
    ADD COLUMN `quizId` VARCHAR(191) NOT NULL,
    ADD COLUMN `type` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `quiz` DROP PRIMARY KEY,
    DROP COLUMN `category`,
    DROP COLUMN `difficulty`,
    DROP COLUMN `quiz_id`,
    ADD COLUMN `id` VARCHAR(191) NOT NULL,
    ADD COLUMN `response_code` INTEGER NOT NULL,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `_userquizzes`;

-- CreateTable
CREATE TABLE `IncorrectAnswer` (
    `id` VARCHAR(191) NOT NULL,
    `text` VARCHAR(191) NOT NULL,
    `questionId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Quiz` ADD CONSTRAINT `Quiz_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Question` ADD CONSTRAINT `Question_quizId_fkey` FOREIGN KEY (`quizId`) REFERENCES `Quiz`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IncorrectAnswer` ADD CONSTRAINT `IncorrectAnswer_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `Question`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
