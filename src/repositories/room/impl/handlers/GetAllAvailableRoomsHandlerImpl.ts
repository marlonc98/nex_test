import { PrismaClient, Room } from "@prisma/client";
import { Either, left, right } from "fp-ts/lib/Either";
import ErrorEntity from "../../../../entities/ErrorEntity";

const prisma = new PrismaClient();
const GetAllAvailableRoomsHandlerImpl = async (checkInDate: Date, checkOutDate: Date, numberOfGuests: number, optionals: { includeBreakfast?: boolean; typeOfRoomId?: number; }): Promise<Either<ErrorEntity, Room[]>> => {
    try {
        const response = await prisma.room.findMany({
            where: {
                Bookings: {
                    none: {
                        OR: [
                            {
                                AND: [
                                    {
                                        initialDate: {
                                            lt: checkInDate.toISOString(),
                                        },
                                    },
                                    {
                                        finalDate: {
                                            gt: checkOutDate.toISOString(),
                                        },
                                    },
                                ],
                            },
                        ],
                        canceled: false, 
                    },
                },
                TypeRoom: {
                    maxGuests: {
                        gte: numberOfGuests,
                    },
                },
                // ...(optionals.includeBreakfast !== undefined && { includeBreakfast: optionals.includeBreakfast }), /* All include breakfast in this project it doesn't make sense */
                ...(optionals.typeOfRoomId !== undefined && { typeRoomId: optionals.typeOfRoomId }),
            },
            include: {
                TypeRoom: {
                    include: {
                        RentalAdjustments: true,
                    },
                },
            },
        });
        return right(response);
    } catch (error: any) {
        return left({
            code: 500,
            // message: "Unexpected error",
            message: error.toString(),
            keyMessage: "unexpected_error",
        });
    }
}

export default GetAllAvailableRoomsHandlerImpl;