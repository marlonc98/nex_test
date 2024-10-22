import { injectable } from "inversify";
import RoomRepository, { CalculateRoomCostResponse, RoomWithRelations } from "../RoomRepository";
import { Room } from "@prisma/client";
import GetAllAvailableRoomsHandlerImpl from "./handlers/GetAllAvailableRoomsHandlerImpl";
import CreateRoomHandleImpl from "./handlers/CreateRoomHandleImpl";
import ErrorEntity from "../../../entities/ErrorEntity";
import { Either } from "fp-ts/lib/Either";
import CalculateRoomCostHandleImpl from "./handlers/CalculateRoomCostHandleImpl";
import GetRoomByIdHandlerImpl from "./handlers/GetRoomByIdHandlerImpl";

@injectable()
export default class RoomRepositoryImpl implements RoomRepository {
    getById = (id: number): Promise<Either<ErrorEntity, RoomWithRelations>> => GetRoomByIdHandlerImpl(id);
    calculateRoomCost = (room: RoomWithRelations, checkInDate: Date, checkOutDate: Date, numberOfGuests: number, includeBreakfast: boolean): Either<ErrorEntity, CalculateRoomCostResponse> => CalculateRoomCostHandleImpl(room, checkInDate, checkOutDate, numberOfGuests, includeBreakfast);
    createRoom = (typeRoomId: number, roomName: string): Promise<Either<ErrorEntity, Room>> => CreateRoomHandleImpl(typeRoomId, roomName);
    getAllAvailableRooms = (checkInDate: Date, checkOutDate: Date, numberOfGuests: number, optionals: {
        includeBreakfast: boolean;
        typeOfRoomIds: number[];
    }): Promise<Either<ErrorEntity, Room[]>> => GetAllAvailableRoomsHandlerImpl(checkInDate, checkOutDate, numberOfGuests, optionals);
}