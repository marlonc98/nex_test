import { PrismaClient, Room } from "@prisma/client";
import { Either, left, right } from "fp-ts/lib/Either";
import ErrorEntity from "../../../../entities/ErrorEntity";
import { GetAllReservationsResponse } from "../../BookingRepository";

const prisma = new PrismaClient();
const GetAllBookingsHandlerImpl = async (): Promise<Either<ErrorEntity, GetAllReservationsResponse>> => {
    try {
        const bookings = await prisma.booking.findMany({
            where: {
                canceled: false,
            },
            include: {
                room: {
                    include: {
                        TypeRoom: true,
                    },
                },
            }
        });
        const now = new Date();
        const mapped: GetAllReservationsResponse = {
            Future: bookings.filter((booking) => booking.initialDate > now),
            Past: bookings.filter((booking) => booking.finalDate < now),
            Ongoing: bookings.filter((booking) => booking.initialDate <= now && booking.finalDate >= now),
        };
        return right(mapped);
    } catch (error: any) {
        return left({
            code: 500,
            message: "internal server error",
            keyMessage: "internal_server_error",
        });
    }
}

export default GetAllBookingsHandlerImpl;