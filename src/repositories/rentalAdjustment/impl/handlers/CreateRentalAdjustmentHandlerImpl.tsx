import { Either } from "fp-ts/lib/Either";
import ErrorEntity from "../../../../entities/ErrorEntity";

const CreateRentalAdjustmentHandlerImpl = async (minDays: number, discount: number, typeRoomId: number): Promise<Either<ErrorEntity, void>> => {
    throw new Error("Method not implemented.");
}

export default CreateRentalAdjustmentHandlerImpl;