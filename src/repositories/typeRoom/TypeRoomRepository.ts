import { Either } from "fp-ts/lib/Either";
import ErrorEntity from "../../entities/ErrorEntity";
import { TypeRoom } from "@prisma/client";

export default interface TypeRoomRepository {
    createTypeRoom(name: string, valuePerDay: number, guestsNumber: number): Promise<Either<ErrorEntity, TypeRoom>>;
    getTypeRooms(): Promise<Either<ErrorEntity, TypeRoom[]>>;
    getById(id: number): Promise<Either<ErrorEntity, TypeRoom>>;
}

export const TypeRoomRepositoryName = "TypeRoomRepository";