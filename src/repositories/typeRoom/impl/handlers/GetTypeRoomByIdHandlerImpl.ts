import { Either, left, right } from "fp-ts/lib/Either";
import ErrorEntity from "../../../../entities/ErrorEntity";
import { PrismaClient, TypeRoom } from '@prisma/client';

const prisma = new PrismaClient();
const GetTypeRoomByIdHandlerImpl = async (id: number): Promise<Either<ErrorEntity, TypeRoom>> => {
    try {
        const typeRoom = await prisma.typeRoom.findUnique({
            where: {
                id: id
            }
        });
        if (!typeRoom) {
            return left({
                code: 404,
                message: "type room not found",
                keyMessage: "type_room_not_found"
            });
        }
        return right(typeRoom);
    } catch (e: any) {
        return left({
            code: 500,
            message: "internal server error",
            keyMessage: "internal_server_error"
        });
    }
}

export default GetTypeRoomByIdHandlerImpl;