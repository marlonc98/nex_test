import { injectable } from "inversify";
import { BookingRepository, GetAllReservationsResponse } from "../BookingRepository";
import { Booking, Room } from "@prisma/client";
import { Either } from "fp-ts/lib/Either";
import ErrorEntity from "../../../entities/ErrorEntity";
import CreateBookingHandlerImpl from "./handlers/CreateBookingHandlerImpl";
import GetBookingByIdHandlerImpl from "./handlers/GetBookingByIdHandlerImpl";
import CancelBoookinHandlerImpl from "./handlers/CancelBoookinHandlerImpl";
import GetAllBookingsHandlerImpl from "./handlers/GetAllBookingsHandlerImpl";
import { RoomWithRelations } from "../../room/RoomRepository";

@injectable()
export default class BookingRepositoryImpl implements BookingRepository {
    create = (roomId: number, guestsNumber: number, initDate: Date, endDate: Date, includeBreakfast: boolean, totalPayment: number): Promise<Either<ErrorEntity, Booking>> => CreateBookingHandlerImpl(roomId, guestsNumber, initDate, endDate, includeBreakfast, totalPayment);
    getById = (id: number): Promise<Either<ErrorEntity, RoomWithRelations>> => GetBookingByIdHandlerImpl(id);
    cancelBooking = (id: number): Promise<Either<ErrorEntity, void>> => CancelBoookinHandlerImpl(id);
    getAllReservations = async (): Promise<Either<ErrorEntity,GetAllReservationsResponse> > => GetAllBookingsHandlerImpl();
}