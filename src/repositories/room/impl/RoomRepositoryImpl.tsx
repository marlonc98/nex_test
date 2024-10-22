import { injectable } from "inversify";
import RoomRepository from "../RoomRepository";
import { Room } from "@prisma/client";
import GetAllAvailableRoomsHandlerImpl from "./handlers/GetAllAvailableRoomsHandlerImpl";

@injectable()
export default class RoomRepositoryImpl implements RoomRepository {
    getAllAvailableRooms = (checkInDate: Date, checkOutDate: Date, numberOfGuests: number, optionals: { includeBreakfast: boolean; typeOfRoomIds: number[]; }): Promise<Room[]> => GetAllAvailableRoomsHandlerImpl(checkInDate, checkOutDate, numberOfGuests, optionals);
}