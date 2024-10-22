import { Either } from "fp-ts/lib/Either";
import ErrorEntity from "../../../../entities/ErrorEntity";

const CreateBookingHandlerImpl = async (roomId: number, guestsNumber: number, initDate: Date, endDate: Date, includeBreakfast: boolean): Promise<Either<ErrorEntity, void>> => {
    throw new Error("Method not implemented.");
}

export default CreateBookingHandlerImpl;