import { PrismaClient, Room } from "@prisma/client";
import { Either, right, left } from "fp-ts/lib/Either";
import ErrorEntity from "../../../../entities/ErrorEntity";
import { RoomWithRelations } from "../../../room/RoomRepository";

const prisma = new PrismaClient();
const GetBookingByIdHandlerImpl = async (id: number): Promise<Either<ErrorEntity, RoomWithRelations>> => {
    try {
        const room = await prisma.room.findUnique({
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
        if (room === null) {
            return left({
                code: 404,
                message: "Room not found",
                keyMessage: "room_not_found",
            });
        }
        return right(room);
    } catch (e: any) {
        return left({
            code: 500,
            message: "internal server error",
            keyMessage: "internal_server_error",
        });
    }
}

export default GetBookingByIdHandlerImpl;