import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

const seed = async () => {

    await prisma.typeRoom.createMany({
        data: [
            {
                name: 'Junior Suite',
                pricePerDay: 60,
                maxGuests: 2
            },
            {
                name: 'King Suite',
                pricePerDay: 90,
                maxGuests: 2
            },
            {
                name: 'Presidential Suite',
                pricePerDay: 150,
                maxGuests: 4
            }
        ]
    });

    for (let i = 1; i <= 3; i++) {
        await prisma.rentalAdjustment.createMany({
            data: [
                {
                    typeRoomId: i,
                    minDays: 4,
                    discount: 4,
                },
                {
                    typeRoomId: i,
                    minDays: 7,
                    discount: 8,
                },
                {
                    typeRoomId: i,
                    minDays: 10,
                    discount: 12,
                }
            ]
        });
    }

    //create 2 rooms for each type
    for (let i = 1; i <= 3; i++) {
        for (let j = 1; j <= 2; j++) {
            await prisma.room.create({
                data: {
                    typeRoomId: i,
                    name: `Room ${i}0${j}`,
                }
            });
        }
    }
}

seed()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    });