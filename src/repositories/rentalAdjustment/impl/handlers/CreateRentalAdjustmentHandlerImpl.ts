import { Either, right, left } from "fp-ts/lib/Either";
import ErrorEntity from "../../../../entities/ErrorEntity";
import { PrismaClient, RentalAdjustment, TypeRoom } from "@prisma/client";

const prisma = new PrismaClient();
const CreateRentalAdjustmentHandlerImpl = async (minDays: number, discount: number, TypeRoom: TypeRoom): Promise<Either<ErrorEntity, RentalAdjustment>> => {
    try {
        const validate = (): ErrorEntity | undefined => {
            if (!minDays) return {
                code: 400,
                message: 'Minimum days is required',
                keyMessage: "min_days_error"
            };
            if (minDays < 1) return {
                code: 400,
                message: 'Minimum days must be greater than 0',
                keyMessage: "min_days_less_than_1_error"
            };
            if (!discount) return {
                code: 400,
                message: 'Discount is required',
                keyMessage: "discount_error"
            };
            if (discount < 0) return {
                code: 400,
                message: 'Discount must be greater than or equal to 0',
                keyMessage: "discount_error"
            };
            if (typeRoom.pricePerDay <= discount) {
                return {
                    code: 400,
                    message: 'Discount must be less than the price per day',
                    keyMessage: "discount_error"
                };
            }
        }
        const isValid = validate();
        if (isValid) return left(isValid);
        const response = await prisma.rentalAdjustment.create({
            data: {
                typeRoomId: typeRoom.id,
                minDays: minDays,
                discount: discount,
            }
        });
        return right(response);
    } catch (e: any) {
        return left({
            code: 500,
            message: "internal server error",
            keyMessage: "internal_server_error",
        });
    }
}

export default CreateRentalAdjustmentHandlerImpl;