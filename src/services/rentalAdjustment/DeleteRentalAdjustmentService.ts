import { injectable } from "inversify";
import RentalAdjustmentRepository from "../../repositories/rentalAdjustment/RentalAdjustmentRepository";
import TypeRoomRepository from "../../repositories/typeRoom/TypeRoomRepository";
import { Either, isLeft, left } from "fp-ts/lib/Either";
import ErrorEntity from "../../entities/ErrorEntity";
import { RentalAdjustment } from "@prisma/client";

interface _props {
    rentalAdjustmentRepository: RentalAdjustmentRepository;
}
@injectable()
export default class DeleteRentalAdjustmentService {
    private rentalAdjustmentRepository: RentalAdjustmentRepository;
    constructor({ rentalAdjustmentRepository }: _props) {
        this.rentalAdjustmentRepository = rentalAdjustmentRepository;
    }
    call = async (idString: string): Promise<Either<ErrorEntity, void>> => {
        const validate = (): ErrorEntity | undefined => {
            if(!idString) return {
                code: 400,
                message: 'Rental adjustment id is required',
                keyMessage: "rental_adjustment_id_required"
            }
            if(isNaN(parseInt(idString))) return {
                code: 404,
                message: 'Rental adjustment id must be a number',
                keyMessage: "rental_adjustment_id_must_be_number"
            }
        }
        const isValid = validate();
        if(isValid) return left(isValid);

        const id = parseInt(idString);
        return this.rentalAdjustmentRepository.delete(id);
    }
}

export const DeleteRentalAdjustmentServiceName = 'DeleteRentalAdjustmentService';