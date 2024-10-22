import { injectable } from "inversify";
import TypeRoomRepository from "../TypeRoomRepository";
import { Either } from "fp-ts/lib/Either";
import ErrorEntity from "../../../entities/ErrorEntity";
import CreateTypeRoomHandlerImpl from "./handlers/CreateTypeRoomHandlerImpl";
import { TypeRoom } from "@prisma/client";
import GetTypeRoomsHandlerImpl from "./handlers/GetTypeRoomsHandlerImpl";
import GetTypeRoomByIdHandlerImpl from "./handlers/GetTypeRoomByIdHandlerImpl";

@injectable()
export default class TypeRoomRepositoryImpl implements TypeRoomRepository {
    getTypeRooms = (): Promise<Either<ErrorEntity, TypeRoom[]>> => GetTypeRoomsHandlerImpl();
    createTypeRoom = (name: string, valuePerDay: number, guestsNumber: number): Promise<Either<ErrorEntity, TypeRoom>> => CreateTypeRoomHandlerImpl(name, valuePerDay, guestsNumber);
    getById = (id: number): Promise<Either<ErrorEntity, TypeRoom>> => GetTypeRoomByIdHandlerImpl(id);
}