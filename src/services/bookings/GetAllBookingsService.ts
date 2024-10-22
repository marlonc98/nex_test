import { injectable } from "inversify";
import { Either, left } from "fp-ts/lib/Either";
import ErrorEntity from "../../entities/ErrorEntity";
import { BookingRepository, GetAllReservationsResponse } from "../../repositories/booking/BookingRepository";

interface _props {
    bookingRepository: BookingRepository;
}
@injectable()
export default class GetAllBookingsService {
    private bookingRepository: BookingRepository;
    constructor({ bookingRepository }: _props) {
        this.bookingRepository = bookingRepository;
    }
    call = async (): Promise<Either<ErrorEntity, GetAllReservationsResponse>> => {
        return this.bookingRepository.getAllReservations();
    }
}

export const GetAllBookingsServiceName = 'GetAllBookingsService';