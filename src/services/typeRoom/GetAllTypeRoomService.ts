import { injectable } from "inversify";
import TypeRoomRepository from "../../repositories/typeRoom/TypeRoomRepository";
import { Either } from "fp-ts/lib/Either";
import ErrorEntity from "../../entities/ErrorEntity";
import { TypeRoom } from "@prisma/client";

interface _props {
    typeRoomRepository: TypeRoomRepository;
}
@injectable()
export default class GetAllTypeRoomService {
    private typeRoomRepository: TypeRoomRepository;
    constructor({ typeRoomRepository }: _props) {
        this.typeRoomRepository = typeRoomRepository;
    }

    call = async (): Promise<Either<ErrorEntity, TypeRoom[]>> => {
        return this.typeRoomRepository.getTypeRooms();
    }
}

export const GetAllTypeRoomServiceName = 'GetAllTypeRoomService';