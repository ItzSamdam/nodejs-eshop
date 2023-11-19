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
                where: { id: wishlistId, userId: userId },
                include: {
                    wishlistItem: true
                }
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
            const wishlist = await prisma.wishlist.findUnique({
                where: { id: wishlistId, userId: userId }
            });
            const wishlistItem = await prisma.wishlistItem.deleteMany({
                where: { wishlistId: wishlistId }
            })
            if (!wishlist && !wishlistItem) {
                return false
            }
            return true;
            
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new DatabaseException(error);
            }
            throw new BadRequestException((error as Error).message);
        }
    }

    async addWishlist() {
        
    }
}

export default UserWishlistService;