import { injectable } from "inversify";
import RentalAdjustmentRepository from "../../repositories/rentalAdjustment/RentalAdjustmentRepository";

interface _props {
    rentalAdjustmentRepository: RentalAdjustmentRepository;
}
@injectable()
export default class CreateRentalAdjustmentService {
    private rentalAdjustmentRepository: RentalAdjustmentRepository;
    constructor({ rentalAdjustmentRepository }: _props) {
        this.rentalAdjustmentRepository = rentalAdjustmentRepository;
    }
    call = async (minDays: number, discount: number, typeRoomId: number) => {
        return this.rentalAdjustmentRepository.create(minDays, discount, typeRoomId);
    }
}
