const DayService = require('../dayService');

let days;

beforeAll(() => {
    days = [
        {
            date: '2022-02-07T00:00:00.000Z',
            type: 'A'
        },
        {
            date: '2022-02-08T00:00:00.000Z',
            type: 'A'
        },
        {
            date: '2022-02-09T00:00:00.000Z',
            type: 'A'
        },
        {
            date: '2022-02-10T00:00:00.000Z',
            type: 'A'
        },
        {
            date: '2022-02-11T00:00:00.000Z',
            type: 'A'
        },
        {
            date: '2022-02-12T00:00:00.000Z',
            type: 'Weekend'
        },
        {
            date: '2022-02-13T00:00:00.000Z',
            type: 'Weekend'
        }
    ];
})

test('getAll', async () => {
    let dayModel = {
        find: () => {
            return {
                exec: async () => {
                    return days;
                }
            }
        }
    }

    let dayService = DayService(dayModel);

    expect(await dayService.getAll()).toEqual(days);
})

test('replaceAll', async () => {
    let prevDays = [ ...days ];
    let newDays = [
        {
            date: '2022-02-14T00:00:00.000Z',
            type: 'B'
        },
        {
            date: '2022-02-15T00:00:00.000Z',
            type: 'B'
        },
        {
            date: '2022-02-16T00:00:00.000Z',
            type: 'B'
        },
        {
            date: '2022-02-17T00:00:00.000Z',
            type: 'B'
        },
        {
            date: '2022-02-18T00:00:00.000Z',
            type: 'B'
        },
        {
            date: '2022-02-19T00:00:00.000Z',
            type: 'Weekend'
        },
        {
            date: '2022-02-20T00:00:00.000Z',
            type: 'Weekend'
        }
    ]

    let dayModel = {
        deleteMany: async () => {
            days = [];
        },
        insertMany: async (newDays) => {
            days.push(...newDays);
        }
    }

    let dayService = DayService(dayModel);

    await dayService.replaceAll(newDays);

    expect(days).toEqual(newDays);
    for(let day of prevDays) {
        expect(days).not.toContainEqual(day);
    }
})

test('getOne', async () => {
    let dayModel = {
        findOne: ({ date }) => {
            return {
                exec: async () => {
                    return days.filter(day => (new Date(date)).getTime() === (new Date(day.date)).getTime())[0]
                }
            }
        }
    }

    let dayService = DayService(dayModel);

    expect(await dayService.getOne('2022-02-14')).toEqual(days[0]);
    expect(await dayService.getOne('2022-02-15')).toEqual(days[1]);
    expect(await dayService.getOne('2022-02-16')).toEqual(days[2]);
    expect(await dayService.getOne('2022-02-17')).toEqual(days[3]);
    expect(await dayService.getOne('2022-02-18')).toEqual(days[4]);
    expect(await dayService.getOne('2022-02-19')).toEqual(days[5]);
    expect(await dayService.getOne('2022-02-20')).toEqual(days[6]);
})