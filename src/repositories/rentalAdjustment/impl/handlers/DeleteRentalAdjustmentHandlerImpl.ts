import { Either } from "fp-ts/lib/Either";
import ErrorEntity from "../../../../entities/ErrorEntity";

const DeleteRentalAdjustmentHandlerImpl = async (rentalId: number): Promise<Either<ErrorEntity, void>> => {
    throw new Error("Method not implemented.");
}

export default DeleteRentalAdjustmentHandlerImpl;