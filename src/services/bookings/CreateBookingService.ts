import { injectable } from "inversify";
import { Either, isLeft, left } from "fp-ts/lib/Either";
import ErrorEntity from "../../entities/ErrorEntity";
import RoomRepository from "../../repositories/room/RoomRepository";
import { Booking } from "@prisma/client";
import { BookingRepository } from "../../repositories/booking/BookingRepository";

interface _props {
    roomRepository: RoomRepository;
    bookingRepository: BookingRepository;
}
@injectable()
export default class CreateBookingService {
    private roomRepository: RoomRepository;
    private bookingRepository: BookingRepository;
    constructor({ roomRepository, bookingRepository }: _props) {
        this.roomRepository = roomRepository;
        this.bookingRepository = bookingRepository;
    }

    call = async (roomId: number, initDate: Date, endDate: Date, numberOfGuests: number, includeBreakfast: boolean): Promise<Either<ErrorEntity, Booking>> => {
        const room = await this.roomRepository.getById(roomId);
        if (isLeft(room)) return room;
        const payment = this.roomRepository.calculateRoomCost(room.right, initDate, endDate, numberOfGuests, includeBreakfast);
        if (isLeft(payment)) return payment;
        return this.bookingRepository.create(roomId, numberOfGuests, initDate, endDate, includeBreakfast, payment.right.summary.total);
    }
}

export const CreateBookingServiceName = 'CreateBookingService';