import { Room } from "@prisma/client";

export default interface RoomRepository {
    getAllAvailableRooms(checkInDate: Date, checkOutDate: Date, numberOfGuests: number, optionals: {
        includeBreakfast: boolean;
        typeOfRoomIds: number[];
    }): Promise<Room[]>;
}

export const RoomRepositoryName = 'RoomRepository';