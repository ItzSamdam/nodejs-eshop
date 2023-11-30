import BaseService from '../base.service';
import BadRequestException from '../../exceptions/BadRequestException';
import DatabaseException from '../../exceptions/DatabaseException';
import { Prisma } from '@prisma/client';
import prisma from '../../utils/database.utils';

class AdminAuthService extends BaseService {

    constructor() {
        super();
    }

    async login(email: string, password: string) {
        try {
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new DatabaseException(error);
            }
            throw new BadRequestException((error as Error).message);
        }
    }

    async userInfo(userId: string) {
        try {
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new DatabaseException(error);
            }
            throw new BadRequestException((error as Error).message);
        }
    }

    async updatePassword(userId: string, password: string) {
        try {
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new DatabaseException(error);
            }
            throw new BadRequestException((error as Error).message);
        }
    }

    async resetPassword(userInfo: string, authToken: string, newPassword: string) {
        try {
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new DatabaseException(error);
            }
            throw new BadRequestException((error as Error).message);
        }
    }

    async forgotPassword(email: string) {
        try {
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new DatabaseException(error);
            }
            throw new BadRequestException((error as Error).message);
        }
    }
}

export default AdminAuthService;