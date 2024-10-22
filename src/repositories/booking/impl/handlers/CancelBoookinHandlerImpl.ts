import { Either, right, left } from "fp-ts/lib/Either";
import ErrorEntity from "../../../../entities/ErrorEntity";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const CancelBoookinHandlerImpl = async (id: number): Promise<Either<ErrorEntity, void>> => {
    try {
        //update canceled to true
        await prisma.booking.update({
            where: {
                id: id
            },
            data: {
                canceled: true
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

export default CancelBoookinHandlerImpl;