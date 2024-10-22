import { RentalAdjustment, Room, TypeRoom } from "@prisma/client";
import { CalculateRoomCostResponse, RoomWithRelations } from "../../RoomRepository";
import { Either, left, right } from "fp-ts/lib/Either";
import ErrorEntity from "../../../../entities/ErrorEntity";

const CalculateRoomCostHandleImpl = (room: RoomWithRelations, initDate: Date, endDate: Date, numberOfGuests: number, includeBreakfast?: boolean): Either<ErrorEntity, CalculateRoomCostResponse> => {
    try {
        let roomCost, totalCost, roomDaysDiscount = 0, breakfastCost = 0, weekendsCosts = 0;
        // Calculate the cost of the room
        roomCost = room.TypeRoom.pricePerDay;
        // Calculate the number of days
        const diffTime = Math.abs(endDate.getTime() - initDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        // Calculate the total cost
        totalCost = roomCost * diffDays;

        //get conditionals of rental adjustments
        const rentalAdjustments = room.TypeRoom.RentalAdjustments;
        //order by minDays in descending order
        const rentalSorted = rentalAdjustments.sort((a: RentalAdjustment, b: RentalAdjustment) => b.minDays - a.minDays);

        //apply the rental adjustments
        for (let i = 0; i < rentalSorted.length; i++) {
            const rental = rentalSorted[i];
            if (diffDays >= rental.minDays) {
                roomDaysDiscount = (diffDays * rental.discount);
                break;
            }
        }

        // Calculate additional cost per includeBreakfast
        if (includeBreakfast) {
            //cost is 5 per day per guest
            breakfastCost = 5 * diffDays * numberOfGuests;
        }

        // Calculate additional cost per weekends
        let weekends = 0;
        for (let i = 0; i < diffDays; i++) {
            const date = new Date(initDate);
            date.setDate(date.getDate() + i);
            if (date.getDay() === 0 || date.getDay() === 6) {
                weekends++;
            }
        }

        weekendsCosts = weekends * (room.TypeRoom.pricePerDay * .25);

        return right({
            ...room,
            summary: {
                total: totalCost - roomDaysDiscount + breakfastCost + weekendsCosts,
                subtotal: totalCost,
                longBookingDiscount: -roomDaysDiscount,
                breakfast: breakfastCost,
                weekendCharge: weekendsCosts
            }
        });
    } catch (error) {
        return left({
            code: 500,
            message: "internal server error",
            keyMessage: "internal_server_error"
        });
    }
}

export default CalculateRoomCostHandleImpl;