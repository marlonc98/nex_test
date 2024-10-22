import { PrismaClient, Room } from "@prisma/client";
import { Either, left, right } from "fp-ts/lib/Either";
import ErrorEntity from "../../../../entities/ErrorEntity";

const prisma = new PrismaClient();
const CreateRoomHandleImpl = async (typeRoomId: number, roomName: string): Promise<Either<ErrorEntity, Room>> => {
    try {
        const validate = (): ErrorEntity | undefined => {
            if (!roomName) return {
                code: 400,
                message: 'Name is required',
                keyMessage: "name_field_required"
            };
            if (!typeRoomId) return {
                code: 400,
                message: 'Type of room is required',
                keyMessage: "type_room_field_required"
            };
        };

        const isValid = validate();
        if (isValid) return left(isValid);
        const response = await prisma.room.create({
            data: {
                name: roomName,
                typeRoomId: typeRoomId,
            }
        });
        return right(response);
    } catch (e: any) {
        return left({
            code: 500,
            message: "Not implemented",
            keyMessage: e.toString(),
        });
    }
}

export default CreateRoomHandleImpl;