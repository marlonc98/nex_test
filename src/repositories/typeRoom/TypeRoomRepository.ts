import { Either } from "fp-ts/lib/Either";
import ErrorEntity from "../../entities/ErrorEntity";

export default interface TypeRoomRepository {
    createTypeRoom(name: string, valuePerDay: number): Promise<Either<ErrorEntity, void>>;
}

export const TypeRoomRepositoryName = "TypeRoomRepository";