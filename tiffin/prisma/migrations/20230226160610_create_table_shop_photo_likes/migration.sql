-- CreateTable
CREATE TABLE `ShopPhotoLike` (
    `shopPhotoId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`shopPhotoId`, `userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ShopPhotoLike` ADD CONSTRAINT `ShopPhotoLike_shopPhotoId_fkey` FOREIGN KEY (`shopPhotoId`) REFERENCES `ShopPhoto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ShopPhotoLike` ADD CONSTRAINT `ShopPhotoLike_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
