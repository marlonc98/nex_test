import { injectable } from "inversify";
import RentalAdjustmentRepository from "../../repositories/rentalAdjustment/RentalAdjustmentRepository";
import TypeRoomRepository from "../../repositories/typeRoom/TypeRoomRepository";
import { Either, isLeft, left } from "fp-ts/lib/Either";
import ErrorEntity from "../../entities/ErrorEntity";
import { RentalAdjustment } from "@prisma/client";

interface _props {
    rentalAdjustmentRepository: RentalAdjustmentRepository;
    typeRoomRepository: TypeRoomRepository;
}
@injectable()
export default class CreateRentalAdjustmentService {
    private rentalAdjustmentRepository: RentalAdjustmentRepository;
    private typeRoomRepository: TypeRoomRepository;
    constructor({ rentalAdjustmentRepository, typeRoomRepository }: _props) {
        this.rentalAdjustmentRepository = rentalAdjustmentRepository;
        this.typeRoomRepository = typeRoomRepository;
    }
    call = async (minDays: number, discount: number, typeRoomId: number): Promise<Either<ErrorEntity, RentalAdjustment>> => {
        const typeRoom = await this.typeRoomRepository.getById(typeRoomId);
        if (isLeft(typeRoom)) return typeRoom;
        return this.rentalAdjustmentRepository.create(minDays, discount, typeRoom.right);
    }
}

export const CreateRentalAdjustmentServiceName = 'CreateRentalAdjustmentService';