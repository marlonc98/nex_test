import { injectable } from "inversify";
import RentalAdjustmentRepository from "../RentalAdjustmentRepository";
import { Either } from "fp-ts/lib/Either";
import ErrorEntity from "../../../entities/ErrorEntity";
import CreateRentalAdjustmentHandlerImpl from "./handlers/CreateRentalAdjustmentHandlerImpl";
import DeleteRentalAdjustmentHandlerImpl from "./handlers/DeleteRentalAdjustmentHandlerImpl";
import { RentalAdjustment, TypeRoom } from "@prisma/client";

@injectable()
export default class RentalAdjustmentRepositoryImpl implements RentalAdjustmentRepository {
    create = (minDays: number, discount: number, TypeRoom: TypeRoom): Promise<Either<ErrorEntity, RentalAdjustment>> => CreateRentalAdjustmentHandlerImpl(minDays, discount, typeRoom);
    delete = (rentalId: number): Promise<Either<ErrorEntity, void>> => DeleteRentalAdjustmentHandlerImpl(rentalId);

}