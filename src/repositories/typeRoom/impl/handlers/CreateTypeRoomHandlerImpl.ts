import { Either, left, right } from "fp-ts/lib/Either";
import ErrorEntity from "../../../../entities/ErrorEntity";
import { PrismaClient, TypeRoom } from '@prisma/client';

const prisma = new PrismaClient()

const CreateTypeRoomHandlerImpl = async (name: string, valuePerDay: number, guestsNumber: number): Promise<Either<ErrorEntity, TypeRoom>> => {
    const validate = (): ErrorEntity | undefined => {
        if (!name) return {
            code: 400,
            message: 'Name is required',
            keyMessage: "name_field_required"
        };
        if (!valuePerDay) return {
            code: 400,
            message: 'Value per day is required',
            keyMessage: "value_per_day_field_required"
        };
        if (valuePerDay <= 0) return {
            code: 400,
            message: 'Value per day must be greater than 0',
            keyMessage: "value_per_day_field_required"
        };
        if(!guestsNumber) return {
            code: 400,
            message: 'Guests number is required',
            keyMessage: "guests_number_field_required"
        };
    };
    const isValid = validate();
    if (isValid) return left(isValid);
    try {
        const typeRoom = await prisma.typeRoom.create({
            data: {
                name: name,
                pricePerDay: valuePerDay,
                maxGuests: guestsNumber,
            }
        });
        return right(typeRoom);
    } catch (e: any) {
        return left({
            code: 500,
            message: "Not implemented",
            keyMessage: "not_implemented",
        });
    }
}

export default CreateTypeRoomHandlerImpl;