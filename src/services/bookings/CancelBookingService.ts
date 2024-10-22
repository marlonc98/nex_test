import { injectable } from "inversify";
import { Either, left } from "fp-ts/lib/Either";
import ErrorEntity from "../../entities/ErrorEntity";
import { BookingRepository } from "../../repositories/booking/BookingRepository";

interface _props {
    bookingRepository: BookingRepository;
}
@injectable()
export default class CancelBookingService {
    private bookingRepository: BookingRepository;
    constructor({ bookingRepository }: _props) {
        this.bookingRepository = bookingRepository;
    }
    call = async (idString: string): Promise<Either<ErrorEntity, void>> => {
        const validate = (): ErrorEntity | undefined => {
            if(!idString) return {
                code: 400,
                message: 'Booking id is required',
                keyMessage: "booking_id_required"
            }
        }
        const isValid = validate();
        if(isValid) return left(isValid);

        const id = parseInt(idString);
        return this.bookingRepository.cancelBooking(id);
    }
}

export const CancelBookingServiceName = 'CancelBookingService';