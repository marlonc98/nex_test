import { Either, left, right } from "fp-ts/lib/Either";
import ErrorEntity from "../../../../entities/ErrorEntity";
import { PrismaClient, Room } from '@prisma/client';
import { RoomWithRelations } from "../../RoomRepository";

const prisma = new PrismaClient();
const GetRoomByIdHandlerImpl = async (id: number): Promise<Either<ErrorEntity, RoomWithRelations>> => {
    try {
        const typeRoom = await prisma.room.findUnique({
            where: {
                id: id
            },
            include: {
                TypeRoom: {
                    include: {
                        RentalAdjustments: true,
                    },
                },
            },
        });
        if (!typeRoom) {
            return left({
                code: 404,
                message: "room not found",
                keyMessage: "room_not_found"
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

export default GetRoomByIdHandlerImpl;