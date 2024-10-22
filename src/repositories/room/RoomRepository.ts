import { RentalAdjustment, Room, TypeRoom } from "@prisma/client";
import ErrorEntity from "../../entities/ErrorEntity";
import { Either } from "fp-ts/lib/Either";
export type RoomWithRelations = Room & {
    TypeRoom: TypeRoom & {
        RentalAdjustments: RentalAdjustment[],
    }
}

export interface CalculateRoomCostResponse extends Room {
    TypeRoom: TypeRoom,
    summary: {
        total: number
        subtotal: number,
        longBookingDiscount: number,
        breakfast: number,
        weekendCharge: number
    }
};
export default interface RoomRepository {
    getAllAvailableRooms(checkInDate: Date, checkOutDate: Date, numberOfGuests: number, optionals: {
        includeBreakfast: boolean;
        typeOfRoomIds: number[];
    }): Promise<Either<ErrorEntity, Room[]>>;
    createRoom: (typeRoomId: number, roomName: string) => Promise<Either<ErrorEntity, Room>>;
    getById: (id: number) => Promise<Either<ErrorEntity, RoomWithRelations>>;
    calculateRoomCost: (room: RoomWithRelations, checkInDate: Date, checkOutDate: Date, numberOfGuests: number, includeBreakfast: boolean) => Either<ErrorEntity, CalculateRoomCostResponse>;
}

export const RoomRepositoryName = 'RoomRepository';