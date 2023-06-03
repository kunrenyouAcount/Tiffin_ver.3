/*
  Warnings:

  - You are about to drop the `MasterArea` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MasterCooking` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MasterDetailedArea` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MasterGenre` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MasterGenreMasterCooking` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MasterPrefecture` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MasterRailroadStation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Menu` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Shop` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ShopPhoto` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ShopPhotoLike` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ShopUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `MasterArea` DROP FOREIGN KEY `MasterArea_masterPrefectureId_fkey`;

-- DropForeignKey
ALTER TABLE `MasterDetailedArea` DROP FOREIGN KEY `MasterDetailedArea_masterAreaId_fkey`;

-- DropForeignKey
ALTER TABLE `MasterGenreMasterCooking` DROP FOREIGN KEY `MasterGenreMasterCooking_masterCookingId_fkey`;

-- DropForeignKey
ALTER TABLE `MasterGenreMasterCooking` DROP FOREIGN KEY `MasterGenreMasterCooking_masterGenreId_fkey`;

-- DropForeignKey
ALTER TABLE `MasterRailroadStation` DROP FOREIGN KEY `MasterRailroadStation_masterPrefectureId_fkey`;

-- DropForeignKey
ALTER TABLE `Menu` DROP FOREIGN KEY `Menu_masterCookingId_fkey`;

-- DropForeignKey
ALTER TABLE `Menu` DROP FOREIGN KEY `Menu_shopId_fkey`;

-- DropForeignKey
ALTER TABLE `Shop` DROP FOREIGN KEY `Shop_masterAreaId_fkey`;

-- DropForeignKey
ALTER TABLE `Shop` DROP FOREIGN KEY `Shop_masterRailroadStationId_fkey`;

-- DropForeignKey
ALTER TABLE `Shop` DROP FOREIGN KEY `Shop_shopUserId_fkey`;

-- DropForeignKey
ALTER TABLE `ShopPhoto` DROP FOREIGN KEY `ShopPhoto_menuId_fkey`;

-- DropForeignKey
ALTER TABLE `ShopPhotoLike` DROP FOREIGN KEY `ShopPhotoLike_shopPhotoId_fkey`;

-- DropForeignKey
ALTER TABLE `ShopPhotoLike` DROP FOREIGN KEY `ShopPhotoLike_userId_fkey`;

-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_masterPrefectureId_fkey`;

-- DropTable
DROP TABLE `MasterArea`;

-- DropTable
DROP TABLE `MasterCooking`;

-- DropTable
DROP TABLE `MasterDetailedArea`;

-- DropTable
DROP TABLE `MasterGenre`;

-- DropTable
DROP TABLE `MasterGenreMasterCooking`;

-- DropTable
DROP TABLE `MasterPrefecture`;

-- DropTable
DROP TABLE `MasterRailroadStation`;

-- DropTable
DROP TABLE `Menu`;

-- DropTable
DROP TABLE `Shop`;

-- DropTable
DROP TABLE `ShopPhoto`;

-- DropTable
DROP TABLE `ShopPhotoLike`;

-- DropTable
DROP TABLE `ShopUser`;

-- DropTable
DROP TABLE `User`;

-- CreateTable
CREATE TABLE `master_prefectures` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    FULLTEXT INDEX `master_prefectures_name_idx`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `master_areas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `master_prefecture_id` INTEGER NOT NULL,

    FULLTEXT INDEX `master_areas_name_idx`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `master_detailed_areas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `master_area_id` INTEGER NOT NULL,

    FULLTEXT INDEX `master_detailed_areas_name_idx`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `master_railroad_stations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `post_code` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `status` INTEGER NULL,
    `master_prefecture_id` INTEGER NOT NULL,

    FULLTEXT INDEX `master_railroad_stations_name_idx`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `master_genres` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    FULLTEXT INDEX `master_genres_name_idx`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `master_cookings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    FULLTEXT INDEX `master_cookings_name_idx`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `master_genre_master_cookings` (
    `master_genre_id` INTEGER NOT NULL,
    `master_cooking_id` INTEGER NOT NULL,

    PRIMARY KEY (`master_genre_id`, `master_cooking_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `shop_users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL DEFAULT '',
    `email` VARCHAR(191) NOT NULL DEFAULT '',
    `password` VARCHAR(191) NOT NULL DEFAULT '',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `shop_users_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `shops` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL DEFAULT '',
    `address` VARCHAR(191) NOT NULL DEFAULT '',
    `tel` VARCHAR(191) NOT NULL DEFAULT '',
    `opening_time` VARCHAR(191) NOT NULL DEFAULT '',
    `closing_time` VARCHAR(191) NOT NULL DEFAULT '',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `master_area_id` INTEGER NOT NULL,
    `master_detailed_area_id` INTEGER NOT NULL,
    `master_railroad_station_id` INTEGER NOT NULL,
    `shop_user_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `menus` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL DEFAULT '',
    `price` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `master_cooking_id` INTEGER NOT NULL,
    `shop_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `shop_photos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `path` VARCHAR(191) NOT NULL DEFAULT '',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `menu_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL DEFAULT '',
    `email` VARCHAR(191) NOT NULL DEFAULT '',
    `password` VARCHAR(191) NOT NULL DEFAULT '',
    `master_prefecture_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `users_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `shop_photo_likes` (
    `shop_photo_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,

    PRIMARY KEY (`shop_photo_id`, `user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `master_areas` ADD CONSTRAINT `master_areas_master_prefecture_id_fkey` FOREIGN KEY (`master_prefecture_id`) REFERENCES `master_prefectures`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `master_detailed_areas` ADD CONSTRAINT `master_detailed_areas_master_area_id_fkey` FOREIGN KEY (`master_area_id`) REFERENCES `master_areas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `master_railroad_stations` ADD CONSTRAINT `master_railroad_stations_master_prefecture_id_fkey` FOREIGN KEY (`master_prefecture_id`) REFERENCES `master_prefectures`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `master_genre_master_cookings` ADD CONSTRAINT `master_genre_master_cookings_master_genre_id_fkey` FOREIGN KEY (`master_genre_id`) REFERENCES `master_genres`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `master_genre_master_cookings` ADD CONSTRAINT `master_genre_master_cookings_master_cooking_id_fkey` FOREIGN KEY (`master_cooking_id`) REFERENCES `master_cookings`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `shops` ADD CONSTRAINT `shops_master_area_id_fkey` FOREIGN KEY (`master_area_id`) REFERENCES `master_areas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `shops` ADD CONSTRAINT `shops_master_railroad_station_id_fkey` FOREIGN KEY (`master_railroad_station_id`) REFERENCES `master_railroad_stations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `shops` ADD CONSTRAINT `shops_shop_user_id_fkey` FOREIGN KEY (`shop_user_id`) REFERENCES `shop_users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `menus` ADD CONSTRAINT `menus_master_cooking_id_fkey` FOREIGN KEY (`master_cooking_id`) REFERENCES `master_cookings`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `menus` ADD CONSTRAINT `menus_shop_id_fkey` FOREIGN KEY (`shop_id`) REFERENCES `shops`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `shop_photos` ADD CONSTRAINT `shop_photos_menu_id_fkey` FOREIGN KEY (`menu_id`) REFERENCES `menus`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_master_prefecture_id_fkey` FOREIGN KEY (`master_prefecture_id`) REFERENCES `master_prefectures`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `shop_photo_likes` ADD CONSTRAINT `shop_photo_likes_shop_photo_id_fkey` FOREIGN KEY (`shop_photo_id`) REFERENCES `shop_photos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `shop_photo_likes` ADD CONSTRAINT `shop_photo_likes_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
