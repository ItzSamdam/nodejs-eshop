/*
  Warnings:

  - You are about to drop the column `paymentId` on the `order` table. All the data in the column will be lost.
  - Added the required column `quantity` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_paymentId_fkey`;

-- AlterTable
ALTER TABLE `category` ADD COLUMN `description` VARCHAR(191) NULL,
    ADD COLUMN `imageId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `paymentId`;

-- AlterTable
ALTER TABLE `payment` ADD COLUMN `orderId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `products` ADD COLUMN `inStock` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `quantity` INTEGER NOT NULL,
    ADD COLUMN `sku` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `ProductImages` (
    `id` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `imageId` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProductImages` ADD CONSTRAINT `ProductImages_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
