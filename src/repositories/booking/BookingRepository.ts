import { Booking, Room } from '@prisma/client';
import { Either } from 'fp-ts/lib/Either';
import ErrorEntity from '../../entities/ErrorEntity';
import { RoomWithRelations } from '../room/RoomRepository';

export interface GetAllReservationsResponse { Past: Booking[]; Ongoing: Booking[]; Future: Booking[]; };
export interface BookingRepository {
  create(roomId: number, guestsNumber: number, initDate: Date, endDate: Date, includeBreakfast: boolean, totalPayment: number): Promise<Either<ErrorEntity, Booking>>;
  getById(id: number): Promise<Either<ErrorEntity, RoomWithRelations>>;
  cancelBooking(id: number): Promise<Either<ErrorEntity, void>>;
  getAllReservations(): Promise<Either<ErrorEntity, GetAllReservationsResponse>>;
}

export const BookingRepositoryName = 'BookingRepository';