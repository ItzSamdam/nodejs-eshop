import BaseService from '../base.service';
import prisma from "../../utils/database.utils"
import { Prisma, CouponType } from '@prisma/client';
import BadRequestException from "../../exceptions/BadRequestException";
import DatabaseException from "../../exceptions/DatabaseException";
import NotFoundException from "../../exceptions/NotFoundException";

class CouponService extends BaseService {

    constructor() {
        super();
    }

    async getCoupons() {
        try {
            return await prisma.coupons.findMany();
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new DatabaseException(error);
            }
            throw new BadRequestException((error as Error).message);
        }
    }

    async addCoupon(name: string, type: CouponType, amount?: number) {
        try {
            //check if name exist
            const coupon = await prisma.coupons.findUnique({
                where: { name: name }
            })
            if (coupon) {
                throw new BadRequestException("Coupon already exist")
            }
            return await prisma.coupons.create({
                data: {
                    name,
                    type,
                    amount
                }
            });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new DatabaseException(error);
            }
            throw new BadRequestException((error as Error).message);
        }
    }

    async updateCoupon(couponId: string, name: string, type: CouponType, amount?: number) {
        try {
            //check if name exist
            const coupon = await prisma.coupons.findUnique({
                where: { id: couponId }
            })
            if (!coupon) {
                throw new NotFoundException("Coupon Not Found")
            }
            if (coupon.name != name) {
                //check if name exist in coupons 
                const coupon = await prisma.coupons.findUnique({
                    where: { name: name }
                })
                if (coupon) {
                    throw new BadRequestException("Coupon already exist")
                }
            }
            return await prisma.coupons.create({
                data: {
                    name,
                    type,
                    amount
                }
            });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new DatabaseException(error);
            }
            throw new BadRequestException((error as Error).message);
        }
    }

    async changeCouponStatus(couponId: string) {
        try {
            return prisma.coupons.update({
                where: {
                    id: couponId
                },
                data: {
                    isActive: true ? false : true
                }
            });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new DatabaseException(error);
            }
            throw new BadRequestException((error as Error).message);
        }
    }

    async deleteCoupon(couponId: string) {
        try {
            return prisma.coupons.delete({
                where: {
                    id: couponId
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

export default CouponService;