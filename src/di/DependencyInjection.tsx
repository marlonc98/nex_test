import { Container } from "inversify";
import "reflect-metadata";
import { BookingRepository, BookingRepositoryName } from "../repositories/booking/BookingRepository";
import BookingRepositoryImpl from "../repositories/booking/impl/BookingRepositoryImpl";
import RentalAdjustmentRepository, { RentalAdjustmentRepositoryName } from "../repositories/rentalAdjustment/RentalAdjustmentRepository";
import RentalAdjustmentRepositoryImpl from "../repositories/rentalAdjustment/impl/RentalAdjustmentRepositoryImpl";
import TypeRoomRepository, { TypeRoomRepositoryName } from "../repositories/typeRoom/TypeRoomRepository";
import TypeRoomRepositoryImpl from "../repositories/typeRoom/impl/TypeRoomRepositoryImpl";

//read env to know which implementation to use
const modeApp = process.env.APP_MODE || 'DEV';
const di = new Container();


//If we have tests, fake repositories or others it could be added here
if (modeApp === 'DEV') {
    di.bind<BookingRepository>(BookingRepositoryName).to(BookingRepositoryImpl);
    di.bind<RentalAdjustmentRepository>(RentalAdjustmentRepositoryName).to(RentalAdjustmentRepositoryImpl);
    di.bind<BookingRepository>(BookingRepositoryName).to(BookingRepositoryImpl);
    di.bind<TypeRoomRepository>(TypeRoomRepositoryName).to(TypeRoomRepositoryImpl);
} else {
    di.bind<BookingRepository>(BookingRepositoryName).to(BookingRepositoryImpl);
    di.bind<RentalAdjustmentRepository>(RentalAdjustmentRepositoryName).to(RentalAdjustmentRepositoryImpl);
    di.bind<BookingRepository>(BookingRepositoryName).to(BookingRepositoryImpl);
    di.bind<TypeRoomRepository>(TypeRoomRepositoryName).to(TypeRoomRepositoryImpl);
}

export default di;