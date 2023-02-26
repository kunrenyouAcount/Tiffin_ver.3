-- CreateTable
CREATE TABLE `MasterPrefecture` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    FULLTEXT INDEX `MasterPrefecture_name_idx`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MasterArea` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `masterPrefectureId` BIGINT NOT NULL,

    FULLTEXT INDEX `MasterArea_name_idx`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MasterDetailedArea` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `masterAreaId` BIGINT NOT NULL,

    FULLTEXT INDEX `MasterDetailedArea_name_idx`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MasterRailroadStation` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `post_code` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `status` INTEGER NULL,
    `masterPrefectureId` BIGINT NOT NULL,

    FULLTEXT INDEX `MasterRailroadStation_name_idx`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MasterGenre` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    FULLTEXT INDEX `MasterGenre_name_idx`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MasterCooking` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    FULLTEXT INDEX `MasterCooking_name_idx`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MasterGenreMasterCooking` (
    `masterGenreId` BIGINT NOT NULL,
    `masterCookingId` BIGINT NOT NULL,

    PRIMARY KEY (`masterGenreId`, `masterCookingId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MasterArea` ADD CONSTRAINT `MasterArea_masterPrefectureId_fkey` FOREIGN KEY (`masterPrefectureId`) REFERENCES `MasterPrefecture`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MasterDetailedArea` ADD CONSTRAINT `MasterDetailedArea_masterAreaId_fkey` FOREIGN KEY (`masterAreaId`) REFERENCES `MasterArea`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MasterRailroadStation` ADD CONSTRAINT `MasterRailroadStation_masterPrefectureId_fkey` FOREIGN KEY (`masterPrefectureId`) REFERENCES `MasterPrefecture`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MasterGenreMasterCooking` ADD CONSTRAINT `MasterGenreMasterCooking_masterGenreId_fkey` FOREIGN KEY (`masterGenreId`) REFERENCES `MasterGenre`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MasterGenreMasterCooking` ADD CONSTRAINT `MasterGenreMasterCooking_masterCookingId_fkey` FOREIGN KEY (`masterCookingId`) REFERENCES `MasterCooking`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
