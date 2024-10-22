import { Room } from '@prisma/client';
import { Either } from 'fp-ts/lib/Either';
import ErrorEntity from '../../entities/ErrorEntity';

export interface BookingRepository {
  create(roomId: number, guestsNumber: number, initDate: Date, endDate: Date, includeBreakfast: boolean): Promise<Either<ErrorEntity, void>>;
  getById(id: number): Promise<Room | undefined>;
  cancelBooking(id: number): Promise<Either<ErrorEntity, void>>;
  getAllReservations(): Promise<{
    Past: Room[],
    Ongoing: Room[],
    Future: Room[]
  }>;
}

export const BookingRepositoryName = 'BookingRepository';