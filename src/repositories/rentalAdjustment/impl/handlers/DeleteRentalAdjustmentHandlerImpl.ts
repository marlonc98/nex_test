import { Either, left, right } from "fp-ts/lib/Either";
import ErrorEntity from "../../../../entities/ErrorEntity";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const DeleteRentalAdjustmentHandlerImpl = async (rentalId: number): Promise<Either<ErrorEntity, void>> => {
    try {
        await prisma.rentalAdjustment.delete({
            where: {
                id: rentalId
            }
        });
        return right(undefined);
    } catch (e: any) {
        return left({
            code: 500,
            message: "internal server error",
            keyMessage: "internal_server_error",
        });
    }
}

export default DeleteRentalAdjustmentHandlerImpl;