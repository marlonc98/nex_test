import { Room } from "@prisma/client";

const GetAllBookingsHandlerImpl = async (): Promise<{ Past: Room[]; Ongoing: Room[]; Future: Room[]; }> => {
    throw new Error("Method not implemented.");
}

export default GetAllBookingsHandlerImpl;