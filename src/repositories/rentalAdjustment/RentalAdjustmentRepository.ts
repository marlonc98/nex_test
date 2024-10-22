import { Either } from "fp-ts/lib/Either";
import ErrorEntity from "../../entities/ErrorEntity";

export default interface RentalAdjustmentRepository {
    create(minDays: number, discount: number, typeRoomId: number): Promise<Either<ErrorEntity, void>>;
    delete(rentalId: number): Promise<Either<ErrorEntity, void>>;
}

export const RentalAdjustmentRepositoryName = 'RentalAdjustmentRepository';