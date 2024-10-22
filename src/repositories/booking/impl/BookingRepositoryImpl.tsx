import { injectable } from "inversify";
import { BookingRepository } from "../BookingRepository";
import { Room } from "@prisma/client";
import { Either } from "fp-ts/lib/Either";
import ErrorEntity from "../../../entities/ErrorEntity";
import CreateBookingHandlerImpl from "./handlers/CreateBookingHandlerImpl";
import GetBookingByIdHandlerImpl from "./handlers/GetBookingByIdHandlerImpl";
import CancelBoookinHandlerImpl from "./handlers/CancelBoookinHandlerImpl";
import GetAllBookingsHandlerImpl from "./handlers/GetAllBookingsHandlerImpl";

@injectable()
export default class BookingRepositoryImpl implements BookingRepository {
    create = (roomId: number, guestsNumber: number, initDate: Date, endDate: Date, includeBreakfast: boolean): Promise<Either<ErrorEntity, void>> => CreateBookingHandlerImpl(roomId, guestsNumber, initDate, endDate, includeBreakfast);
    getById = (id: number): Promise<Room | undefined> => GetBookingByIdHandlerImpl(id);
    cancelBooking = (id: number): Promise<Either<ErrorEntity, void>> => CancelBoookinHandlerImpl(id);
    getAllReservations = async (): Promise<{ Past: Room[]; Ongoing: Room[]; Future: Room[]; }> => GetAllBookingsHandlerImpl();
}