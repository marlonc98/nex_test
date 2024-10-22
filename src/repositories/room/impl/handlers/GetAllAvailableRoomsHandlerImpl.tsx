import { Room } from "@prisma/client";

const GetAllAvailableRoomsHandlerImpl = async (checkInDate: Date, checkOutDate: Date, numberOfGuests: number, optionals: { includeBreakfast: boolean; typeOfRoomIds: number[]; }): Promise<Room[]> => {
    throw new Error("Method not implemented.");
}

export default GetAllAvailableRoomsHandlerImpl;