import BaseService from "../base.service";
import BadRequestException from "../../exceptions/BadRequestException";
import DatabaseException from "../../exceptions/DatabaseException";
import { Prisma } from "@prisma/client";
import prisma from "../../utils/database.utils";

class OrdersService extends BaseService {
    constructor() {
        super();
    }

    async getOrders() {
        try {
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new DatabaseException(error);
            }
            throw new BadRequestException((error as Error).message);
        }
    }

    async getOrder(orderId: string) {
        try {
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new DatabaseException(error);
            }
            throw new BadRequestException((error as Error).message);
        }
    }

    async updateOrder(orderId: string, orderInfo: any) {
        try {
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new DatabaseException(error);
            }
            throw new BadRequestException((error as Error).message);
        }
    }

    async deleteOrder(orderId: string) {
        try {
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new DatabaseException(error);
            }
            throw new BadRequestException((error as Error).message);
        }
    }

    async trackOrder(orderId: string, orderInfo: any) {
        try {
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new DatabaseException(error);
            }
            throw new BadRequestException((error as Error).message);
        }

    }

    async createOrder(orderInfo: any) {
        try {
            
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new DatabaseException(error);
            }

            throw new BadRequestException((error as Error).message);
        }
    }
}