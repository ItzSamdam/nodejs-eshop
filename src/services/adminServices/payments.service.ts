import BaseService from "../base.service";
import BadRequestException from "../../exceptions/BadRequestException";
import DatabaseException from "../../exceptions/DatabaseException";
import { Prisma } from "@prisma/client";
import prisma from "../../utils/database.utils";

class PaymentsService extends BaseService {
    constructor() {
        super();
    }
}
export default PaymentsService;