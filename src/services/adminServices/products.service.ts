import BaseService from "../base.service";
import prisma from "../../utils/database.utils";
import { Prisma } from "@prisma/client";
import BadRequestException from "../../exceptions/BadRequestException";
import DatabaseException from "../../exceptions/DatabaseException";
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

    async createProducts() {
        //create category
        try {
            return await prisma.products.create({
                data: {

                }
            });

        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new DatabaseException(error);
            }
            throw new BadRequestException((error as Error).message);
        }

    }

    async uploadCategoryImage(categoryId: string, image: any) {
        try {
            //check if imageId exists for student if yes delete from cloudinary
            const category = await prisma.category.findUnique({
                where: { id: categoryId }, select: { imageId: true },
            });
            if (category?.imageId) {
                await Cloudinary.uploader.destroy(category.imageId);
            }
            //upload avatar
            const extName = path.extname(image.originalname).toString();
            const file64 = parser.format(extName, image.buffer);

            //upload to cloudinary
            let result = await Cloudinary.uploader.upload(file64.content!, {
                folder: "CategoryInfo",
            });
            if (!result) {
                throw new BadRequestException("Unable to upload Image");
            }

            return await prisma.category.update({
                where: {
                    id: categoryId
                },
                data: {
                    image: result?.secure_url,
                    imageId: result?.public_id
                }
            });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new DatabaseException(error);
            }
            throw new BadRequestException((error as Error).message);
        }
    }

    async updateCategory(categoryId: string, name: string, description?: string) {
        try {
            return await prisma.category.update({
                where: {
                    id: categoryId
                },
                data: {
                    name,
                    description
                }
            });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new DatabaseException(error);
            }
            throw new BadRequestException((error as Error).message);
        }
    }

    deleteCategory(categoryId: string) {
        try {
            return prisma.category.delete({
                where: {
                    id: categoryId
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