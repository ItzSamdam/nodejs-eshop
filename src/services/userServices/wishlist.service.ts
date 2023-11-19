import BaseService from '../base.service';
import prisma from "../../utils/database.utils";
import { Prisma } from "@prisma/client";
import BadRequestException from "../../exceptions/BadRequestException";
import DatabaseException from "../../exceptions/DatabaseException";

class UserWishlistService extends BaseService {

    constructor() {
        super();
    }

    async fetchWishlist(userId: string) {
        try {
            return await prisma.wishlist.findMany({
                where: { userId: userId }
            });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new DatabaseException(error);
            }
            throw new BadRequestException((error as Error).message);
        }
    }

    async getWishlist(userId: string, wishlistId: string) {
        try {
            return await prisma.wishlist.findUnique({
                where: { id: wishlistId, userId: userId }
            });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new DatabaseException(error);
            }
            throw new BadRequestException((error as Error).message);
        }
    }

    async deleteWishlist(userId: string, wishlistId: string) {
        try {
            return await prisma.wishlist.delete({
                where: { id: wishlistId, userId: userId }
            });
            
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new DatabaseException(error);
            }
            throw new BadRequestException((error as Error).message);
        }
    }

    async addWishlist(userId: string, productId: string) {
        try {
            //check product exist before now
            const existing = await prisma.wishlist.findFirst({
                where: {
                    productId
                }
            });
            if (existing) {
                return existing;
            }
            return await prisma.wishlist.create({
                data: {
                    userId,
                    productId
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

export default UserWishlistService;