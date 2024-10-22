import { Either } from "fp-ts/lib/Either";
import ErrorEntity from "../../../../entities/ErrorEntity";

const CancelBoookinHandlerImpl = async (id: number): Promise<Either<ErrorEntity, void>> => {
    throw new Error("Method not implemented.");
}

export default CancelBoookinHandlerImpl;