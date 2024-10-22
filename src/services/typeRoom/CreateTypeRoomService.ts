import { injectable } from "inversify";
import TypeRoomRepository from "../../repositories/typeRoom/TypeRoomRepository";
import { Either, left } from "fp-ts/lib/Either";
import ErrorEntity from "../../entities/ErrorEntity";
import { TypeRoom } from "@prisma/client";

interface _props {
    typeRoomRepository: TypeRoomRepository;
}
@injectable()
export default class CreateTypeRoomService {
    private typeRoomRepository: TypeRoomRepository;
    constructor({ typeRoomRepository }: _props) {
        this.typeRoomRepository = typeRoomRepository;
    }

    call = async (name: string, valuePerDay: number, guestsNumber: number): Promise<Either<ErrorEntity, TypeRoom>> => {
        return this.typeRoomRepository.createTypeRoom(name, valuePerDay, guestsNumber);
    }
}

export const CreateTypeRoomServiceName = 'CreateTypeRoomService';