import { Either } from "fp-ts/lib/Either";
import ErrorEntity from "../../../../entities/ErrorEntity";

const CreateTypeRoomHandlerImpl = async (name: string, valuePerDay: number): Promise<Either<ErrorEntity, void>> => {
    throw new Error("Method not implemented.");
}

export default CreateTypeRoomHandlerImpl;