import { injectable } from "inversify";
import { Either, left } from "fp-ts/lib/Either";
import ErrorEntity from "../../entities/ErrorEntity";
import RoomRepository from "../../repositories/room/RoomRepository";
import { Room } from "@prisma/client";

interface _props {
    roomRepository: RoomRepository;
}
@injectable()
export default class CreateRoomService {
    private roomRepository: RoomRepository;
    constructor({ roomRepository }: _props) {
        this.roomRepository = roomRepository;
    }

    call = async (name: string, typeRoomId: number): Promise<Either<ErrorEntity, Room>> => {
        return this.roomRepository.createRoom(typeRoomId, name);
    }
}

export const CreateRoomServiceName = 'CreateRoomService';