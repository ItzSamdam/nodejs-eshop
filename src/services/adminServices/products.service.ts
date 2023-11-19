import BaseService from "../base.service";
import prisma from "../../utils/database.utils";
import { Prisma } from "@prisma/client";
import BadRequestException from "../../exceptions/BadRequestException";
import DatabaseException from "../../exceptions/DatabaseException";
import NotFoundException from "../../exceptions/NotFoundException";
import * as path from "path";
import Cloudinary from "../../config/cloudinary.config";
import DatauriParser from "datauri/parser";
const parser = new DatauriParser();
require("dotenv").config();

class ProductService extends BaseService {
    constructor() {
        super();
    }

    async getAllProducts() {
        try {
            return await prisma.products.findMany({
                include: {
                    category: true
                }
            });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new DatabaseException(error);
            }
            throw new BadRequestException((error as Error).message);
        }
    }

    async getProductsByCategory(categoryId: string) {
        try {
            const category = await prisma.category.findUnique({
                where: { id: categoryId }
            })
            if (!category) {
                throw new NotFoundException("Category doesnt exist")
            }
            return await prisma.products.findMany({
                where: {
                    categoryId: categoryId
                },
                include: {
                    category: true,
                    productImages: true
                }
            });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new DatabaseException(error);
            }
            throw new BadRequestException((error as Error).message);
        }
    }


    async getProductById(productId: string) {
        try {
            return await prisma.products.findUnique({
                where: {
                    id: productId
                },
                include: {
                    category: true,
                    productImages: true
                }
            });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new DatabaseException(error);
            }
            throw new BadRequestException((error as Error).message);
        }
    }

    async createProducts(name: string, description: string, price: number, discount: number, categoryId: string, sku: string, quantity: number, inStock: boolean, isFeatured: boolean) {
        //create category
        try {
            //check if category exists
            const category = await prisma.category.findUnique({
                where: { id: categoryId }
            });
            if (!category) {
                throw new BadRequestException("Category does not exist");
            }
            return await prisma.products.create({
                data: {
                    name,
                    description,
                    price,
                    discount,
                    category: {
                        connect: {
                            id: categoryId
                        }
                    },
                    sku,
                    quantity,
                    inStock,
                    isFeatured,
                }
            });

        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new DatabaseException(error);
            }
            throw new BadRequestException((error as Error).message);
        }
    }

    async updateProduct(productId: string, name: string, description: string, price: number, discount: number, categoryId: string, sku: string, quantity: number, inStock: boolean, isFeatured: boolean) {
        try {
            //check if category exists
            const category = await prisma.category.findUnique({
                where: { id: categoryId }
            });
            if (!category) {
                throw new BadRequestException("Category does not exist");
            }
            return await prisma.products.update({
                where: {
                    id: productId
                },
                data: {
                    name,
                    description,
                    price,
                    discount,
                    category: {
                        connect: {
                            id: categoryId
                        }
                    },
                    sku,
                    quantity,
                    inStock,
                    isFeatured,
                }
            });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new DatabaseException(error);
            }
            throw new BadRequestException((error as Error).message);
        }
    }

    async uploadProductImage(productId: string, image: any) {
        try {
            for (const imageFile of image) {
                const extName = path.extname(imageFile.originalname).toString();
                const file64 = parser.format(extName, imageFile.buffer);

                // Upload to Cloudinary
                const result = await Cloudinary.uploader.upload(file64.content, {
                    folder: "ProductInfo",
                    quality: 'auto', // Automatically optimize image quality
                });

                if (!result || !result.secure_url || !result.public_id) {
                    throw new BadRequestException("Unable to upload Image");
                }

                // Update product with image URL and image ID
                await prisma.productImages.create({
                    data: {
                        productId,
                        image: result.secure_url,
                        imageId: result.public_id
                    }
                });
            }
            //handle multiple uploads of array of images 
            
            return await prisma.products.findUnique({
                where: {
                    id: productId
                },
                include: {
                    productImages: true
                }
            });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new DatabaseException(error);
            }
            throw new BadRequestException((error as Error).message);
        }
    }

    deleteProduct(productId: string) {
        try {
            return prisma.products.delete({
                where: {
                    id: productId
                }
            });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new DatabaseException(error);
            }
            throw new BadRequestException((error as Error).message);
        }
    }
}

export default ProductService;