import { injectable } from "inversify";
import TypeRoomRepository from "../TypeRoomRepository";
import { Either } from "fp-ts/lib/Either";
import ErrorEntity from "../../../entities/ErrorEntity";
import CreateTypeRoomHandlerImpl from "./handlers/CreateTypeRoomHandlerImpl";

@injectable()
export default class TypeRoomRepositoryImpl implements TypeRoomRepository {
    createTypeRoom = (name: string, valuePerDay: number): Promise<Either<ErrorEntity, void>> => CreateTypeRoomHandlerImpl(name, valuePerDay);
}