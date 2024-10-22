import { Either, right, left } from "fp-ts/lib/Either";
import ErrorEntity from "../../../../entities/ErrorEntity";
import { Booking, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const CreateBookingHandlerImpl = async (roomId: number, guestsNumber: number, initDate: Date, endDate: Date, includeBreakfast: boolean, totalPayment: number): Promise<Either<ErrorEntity, Booking>> => {
    console.log(JSON.stringify({
        roomId,
        guestsNumber,
        initDate,
        endDate,
        includeBreakfast,
        totalPayment
    }))
    try {
        //check if exists another booking that cross the dates
        const existingBooking = await prisma.booking.findFirst({
            where: {
                roomId: roomId,
                AND: [
                    {
                        initialDate: {
                            lte: initDate.toISOString(),
                        },
                    },
                    {
                        finalDate: {
                            gte: endDate.toISOString(), 
                        },
                    },
                    {
                        canceled: false,
                    },
                ],
            },
        });

        if (existingBooking) {
            return left({
                code: 409,
                message: "Booking already exists",
                keyMessage: "booking_already_exists",
            });
        }

        
        const response = await prisma.booking.create({
            data: {
                initialDate: initDate,
                finalDate: endDate,
                withBreakfast: includeBreakfast,
                roomId: roomId,
                numberOfGuest: guestsNumber,
                totalPayment: totalPayment,
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

export default CreateBookingHandlerImpl;