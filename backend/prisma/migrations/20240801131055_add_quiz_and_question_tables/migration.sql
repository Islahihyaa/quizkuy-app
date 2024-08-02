-- CreateTable
CREATE TABLE `Quiz` (
    `quiz_id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `difficulty` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`quiz_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Question` (
    `questions_id` VARCHAR(191) NOT NULL,
    `quiz_id` VARCHAR(191) NOT NULL,
    `question` VARCHAR(191) NOT NULL,
    `correct_answer` VARCHAR(191) NOT NULL,
    `incorrect_answers` JSON NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`questions_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_UserQuizzes` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_UserQuizzes_AB_unique`(`A`, `B`),
    INDEX `_UserQuizzes_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Question` ADD CONSTRAINT `Question_quiz_id_fkey` FOREIGN KEY (`quiz_id`) REFERENCES `Quiz`(`quiz_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_UserQuizzes` ADD CONSTRAINT `_UserQuizzes_A_fkey` FOREIGN KEY (`A`) REFERENCES `Quiz`(`quiz_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_UserQuizzes` ADD CONSTRAINT `_UserQuizzes_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
