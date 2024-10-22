import { Either } from "fp-ts/lib/Either";
import ErrorEntity from "../../entities/ErrorEntity";
import { RentalAdjustment, TypeRoom } from "@prisma/client";

export default interface RentalAdjustmentRepository {
    create(minDays: number, discount: number, TypeRoom: TypeRoom): Promise<Either<ErrorEntity, RentalAdjustment>>;
    delete(rentalId: number): Promise<Either<ErrorEntity, void>>;
}

export const RentalAdjustmentRepositoryName = 'RentalAdjustmentRepository';