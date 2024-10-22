import { injectable } from "inversify";
import { Either, isLeft, isRight, left, right } from "fp-ts/lib/Either";
import ErrorEntity from "../../entities/ErrorEntity";
import RoomRepository, { CalculateRoomCostResponse, RoomWithRelations } from "../../repositories/room/RoomRepository";
import { RentalAdjustment, Room, TypeRoom } from "@prisma/client";
import CalculateRoomCostHandleImpl from "../../repositories/room/impl/handlers/CalculateRoomCostHandleImpl";

interface _props {
    roomRepository: RoomRepository;
}

@injectable()
export default class GetAvailableRoomsService {
    private roomRepository: RoomRepository;
    constructor({ roomRepository }: _props) {
        this.roomRepository = roomRepository;
    }

    call = async (checkInDate: Date, checkOutDate: Date, numberOfGuests: number, optionals: {
        includeBreakfast: boolean;
        typeOfRoomIds: number[];
    }): Promise<Either<ErrorEntity, CalculateRoomCostResponse[]>> => {
        try {
            //validat the dates
            const validate = (): ErrorEntity | undefined => {
                if (!checkInDate) {
                    return {
                        code: 400,
                        message: 'Check-in date is required',
                        keyMessage: "checkin_error"
                    };
                }
                if (!checkOutDate) {
                    return {
                        code: 400,
                        message: 'Check-out date is required',
                        keyMessage: "checkout_error"
                    };
                }
                if (checkInDate >= checkOutDate) {
                    return {
                        code: 400,
                        message: 'Check-in date must be before check-out date',
                        keyMessage: "dates_error"
                    };
                }
                if (!numberOfGuests) {
                    return {
                        code: 400,
                        message: 'Number of guests is required',
                        keyMessage: "guests_error"
                    };
                }
            }
            const isValid = validate();
            if (isValid) return left(isValid);
            const availables = await this.roomRepository.getAllAvailableRooms(checkInDate, checkOutDate, numberOfGuests, optionals);
            if (isLeft(availables)) return availables;
            //add summary to all
            const response: CalculateRoomCostResponse[] = [];
            availables.right.forEach(room => {
                const roomWithRelations = room as RoomWithRelations;
                const summary = CalculateRoomCostHandleImpl(roomWithRelations, checkInDate, checkOutDate, numberOfGuests, optionals.includeBreakfast);
                if (isRight(summary))
                    response.push(summary.right);
            });
            return right(response);
        } catch (error) {
            return left({
                code: 500,
                message: 'Internal server error',
                keyMessage: "internal_server_error"
            });
        }

    }
}

export const GetAvailableRoomsServiceName = 'GetAvailableRoomsService';