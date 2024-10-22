import { injectable } from "inversify";
import RentalAdjustmentRepository from "../RentalAdjustmentRepository";
import { Either } from "fp-ts/lib/Either";
import ErrorEntity from "../../../entities/ErrorEntity";
import CreateRentalAdjustmentHandlerImpl from "./handlers/CreateRentalAdjustmentHandlerImpl";
import DeleteRentalAdjustmentHandlerImpl from "./handlers/DeleteRentalAdjustmentHandlerImpl";

@injectable()
export default class RentalAdjustmentRepositoryImpl implements RentalAdjustmentRepository {
    create = (minDays: number, discount: number, typeRoomId: number): Promise<Either<ErrorEntity, void>> => CreateRentalAdjustmentHandlerImpl(minDays, discount, typeRoomId);
    delete = (rentalId: number): Promise<Either<ErrorEntity, void>> => DeleteRentalAdjustmentHandlerImpl(rentalId);

}