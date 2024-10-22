import { Container } from "inversify";
import "reflect-metadata";
import { BookingRepository, BookingRepositoryName } from "../repositories/booking/BookingRepository";
import BookingRepositoryImpl from "../repositories/booking/impl/BookingRepositoryImpl";
import RentalAdjustmentRepository, { RentalAdjustmentRepositoryName } from "../repositories/rentalAdjustment/RentalAdjustmentRepository";
import RentalAdjustmentRepositoryImpl from "../repositories/rentalAdjustment/impl/RentalAdjustmentRepositoryImpl";
import TypeRoomRepository, { TypeRoomRepositoryName } from "../repositories/typeRoom/TypeRoomRepository";
import TypeRoomRepositoryImpl from "../repositories/typeRoom/impl/TypeRoomRepositoryImpl";
import CreateRentalAdjustmentService, { CreateRentalAdjustmentServiceName } from "../services/rentalAdjustment/CreateRentalAdjustmentService";
import CreateTypeRoomService, { CreateTypeRoomServiceName } from "../services/typeRoom/CreateTypeRoomService";
import CreateRoomService, { CreateRoomServiceName } from "../services/room/CreateRoomService";
import RoomRepository, { RoomRepositoryName } from "../repositories/room/RoomRepository";
import GetAvailableRoomsService, { GetAvailableRoomsServiceName } from "../services/room/GetAvailableRoomsService";
import RoomRepositoryImpl from "../repositories/room/impl/RoomRepositoryImpl";
import GetAllTypeRoomService, { GetAllTypeRoomServiceName } from "../services/typeRoom/GetAllTypeRoomService";
import CancelBookingService, { CancelBookingServiceName } from "../services/bookings/CancelBookingService";
import CreateBookingService, { CreateBookingServiceName } from "../services/bookings/CreateBookingService";
import GetAllBookingsService, { GetAllBookingsServiceName } from "../services/bookings/GetAllBookingsService";

//read env to know which implementation to use
const modeApp = process.env.APP_MODE || 'DEV';
const di = new Container();


//If we have tests, fake repositories or others it could be added here
if (modeApp === 'DEV') {
    di.bind<BookingRepository>(BookingRepositoryName).to(BookingRepositoryImpl).inSingletonScope();
    di.bind<RentalAdjustmentRepository>(RentalAdjustmentRepositoryName).to(RentalAdjustmentRepositoryImpl).inSingletonScope();
    di.bind<RoomRepository>(RoomRepositoryName).to(RoomRepositoryImpl).inSingletonScope();
    di.bind<TypeRoomRepository>(TypeRoomRepositoryName).to(TypeRoomRepositoryImpl).inSingletonScope();
} else {
    di.bind<BookingRepository>(BookingRepositoryName).to(BookingRepositoryImpl).inSingletonScope();
    di.bind<RentalAdjustmentRepository>(RentalAdjustmentRepositoryName).to(RentalAdjustmentRepositoryImpl).inSingletonScope();
    di.bind<RoomRepository>(RoomRepositoryName).to(RoomRepositoryImpl).inSingletonScope();
    di.bind<TypeRoomRepository>(TypeRoomRepositoryName).to(TypeRoomRepositoryImpl).inSingletonScope();
}

//#region Services
//#region booking
di.bind<CancelBookingService>(CancelBookingServiceName).toDynamicValue((context) => {
    return new CancelBookingService({
        bookingRepository: context.container.get<BookingRepository>(BookingRepositoryName)
    });
}).inSingletonScope();
di.bind<CreateBookingService>(CreateBookingServiceName).toDynamicValue((context) => {
    return new CreateBookingService({
        roomRepository: context.container.get<RoomRepository>(RoomRepositoryName),
        bookingRepository: context.container.get<BookingRepository>(BookingRepositoryName)
    });
}).inSingletonScope();
di.bind<GetAllBookingsService>(GetAllBookingsServiceName).toDynamicValue((context) => {
    return new GetAllBookingsService({
        bookingRepository: context.container.get<BookingRepository>(BookingRepositoryName)
    });
}).inSingletonScope();
//#endregion booking
//#region rentalAdjustment
di.bind<CreateRentalAdjustmentService>(CreateRentalAdjustmentServiceName).toDynamicValue((context) => {
    return new CreateRentalAdjustmentService({
        rentalAdjustmentRepository: context.container.get<RentalAdjustmentRepository>(RentalAdjustmentRepositoryName),
        typeRoomRepository: context.container.get<TypeRoomRepository>(TypeRoomRepositoryName)
    });
}).inSingletonScope();
//#endregion rentalAdjustment
//#region room
di.bind<CreateRoomService>(CreateRoomServiceName).toDynamicValue((context) => {
    return new CreateRoomService({
        roomRepository: context.container.get<RoomRepository>(RoomRepositoryName)
    });
}).inSingletonScope();
di.bind<GetAvailableRoomsService>(GetAvailableRoomsServiceName).toDynamicValue((context) => {
    return new GetAvailableRoomsService({
        roomRepository: context.container.get<RoomRepository>(RoomRepositoryName)
    });
}).inSingletonScope();
//#endregion room
//#region typeRoom
di.bind<CreateTypeRoomService>(CreateTypeRoomServiceName).toDynamicValue((context) => {
    return new CreateTypeRoomService({
        typeRoomRepository: context.container.get<TypeRoomRepository>(TypeRoomRepositoryName)
    });
}).inSingletonScope();
di.bind<GetAllTypeRoomService>(GetAllTypeRoomServiceName).toDynamicValue((context) => {
    return new GetAllTypeRoomService({
        typeRoomRepository: context.container.get<TypeRoomRepository>(TypeRoomRepositoryName)
    });
}).inSingletonScope();
//#endregion typeRoom
//#endregion Services

export default di;