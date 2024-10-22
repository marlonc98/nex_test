import { Either, right, left } from "fp-ts/lib/Either";
import ErrorEntity from "../../../../entities/ErrorEntity";
import { TypeRoom, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const GetTypeRoomsHandlerImpl = async (): Promise<Either<ErrorEntity, TypeRoom[]>> => {
    try {
        const response = await prisma.typeRoom.findMany();
        return right(response);
    }catch(e: any){
        return left({
            code: 500,
            message: "Unexpected error",
            keyMessage: "unexpected_error"
        })
    }
}

export default GetTypeRoomsHandlerImpl;