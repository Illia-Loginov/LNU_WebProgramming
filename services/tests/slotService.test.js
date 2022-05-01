const SlotService = require('../slotService');

let slots;

beforeAll(() => {
    slots = [
        {
            number: 1,
            start: "8:30",
            end: "9:50"
        },
        {
            number: 2,
            start: "10:10",
            end: "11:30"
        },
        {
            number: 3,
            start: "11:50",
            end: "13:10"
        },
        {
            number: 4,
            start: "13:30",
            end: "14:50"
        }
    ]
})

test('getAll', async () => {
    let slotModel = {
        find: () => {
            return {
                exec: async () => {
                    return slots;
                }
            }
        }
    }

    let slotService = SlotService(slotModel);

    expect(await slotService.getAll()).toEqual(slots);
})

test('replaceAll', async () => {
    let prevslots = [ ...slots ];
    let newslots = [
        {
            number: 5,
            start: "15:05",
            end: "16:25"
        },
        {
            number: 6,
            start: "16:40",
            end: "18:00"
        },
        {
            number: 7,
            start: "18:10",
            end: "19:30"
        },
        {
            number: 8,
            start: "19:40",
            end: "21:00"
        }
    ]

    let slotModel = {
        deleteMany: async () => {
            slots = [];
        },
        insertMany: async (newslots) => {
            slots.push(...newslots);
        }
    }

    let slotService = SlotService(slotModel);

    await slotService.replaceAll(newslots);

    expect(slots).toEqual(newslots);
    for(let slot of prevslots) {
        expect(slots).not.toContainEqual(slot);
    }
})

test('getOne', async () => {
    let slotModel = {
        findOne: ({ number }) => {
            return {
                exec: async () => {
                    return slots.filter(slot => slot.number === number)[0]
                }
            }
        }
    }

    let slotService = SlotService(slotModel);

    expect(await slotService.getOne(5)).toEqual(slots[0]);
    expect(await slotService.getOne(6)).toEqual(slots[1]);
    expect(await slotService.getOne(7)).toEqual(slots[2]);
    expect(await slotService.getOne(8)).toEqual(slots[3]);
})