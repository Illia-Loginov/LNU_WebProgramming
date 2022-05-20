const GroupService = require('../groupService');

let groups;
let lessons;
let dayModel;
let slotModel;

beforeAll(() => {
    groups = [
        {
            name: 'A'
        },
        {
            name: 'B'
        },
        {
            name: 'C'
        },
    ]

    groups = groups.map(groupToModify => {
        groupToModify = {
            ...groupToModify,
            save: async function() {
                groups = groups.map(group => {
                    if(group.name === this.name)
                        return this;
                    else
                        return group;
                })
            },
            deleteOne: async function() {
                groups = groups.filter(group => group.name !== this.name);
            }
        }

        return groupToModify;
    })

    lessons = [
        {
			_id: 'A',
			subject: 'S',
			teacher: {
				_id: '0',
				name: 'A'
			},
			groups: [
				'A'
			],
			week: 'AB',
			day: 1,
			slot: 1
		},
        {
			_id: 'B',
			subject: 'S',
			teacher: {
				_id: '0',
				name: 'A'
			},
			groups: [
				'A'
			],
			week: 'A',
			day: 2,
			slot: 2
		},
        {
			_id: 'C',
			subject: 'S',
			teacher: {
				_id: '0',
				name: 'A'
			},
			groups: [
				'A'
			],
			week: 'B',
			day: 3,
			slot: 3
		},
        {
			_id: 'D',
			subject: 'S',
			teacher: {
				_id: '1',
				name: 'B'
			},
			groups: [
				'B'
			],
			week: 'AB',
			day: 4,
			slot: 4
		},
        {
			_id: 'E',
			subject: 'S',
			teacher: {
				_id: '1',
				name: 'B'
			},
			groups: [
				'B'
			],
			week: 'A',
			day: 5,
			slot: 5
		},
    ],

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
        },
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
        },
    ];

    dayModel = {
        findOne: ({ date }) => {
            return {
                exec: async () => {
                    return days.filter(day => (new Date(day.date)).getTime() == (new Date(date)).getTime())[0];
                }
            }
        }
    }

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
        },
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

    slotModel = {
        findOne: ({ start }) => {
            let { $lte: time } = start;
            return {
                exec: async () => {
                    return slots.filter(slot => slot.start <= time && slot.end >= time)[0];
                }
            }
        },
        find: ({ end }) => {
            let { $gte: time } = end;
            return {
                exec: async () => {
                    return slots.filter(slot => time <= slot.end);
                }
            }
        }
    }
})

test('getAll', async () => {
    groupModel = {
        find: () => {
            return {
                exec: async () => {
                    return groups
                }
            }
        }
    }

    const groupService = GroupService(groupModel, {}, {}, {});

    expect(await groupService.getAll()).toEqual(groups);
})

test('createOne', async () => {
    groupModel = {
        create: async (group) => {
            groups.push({
                ...groups[0],
                ...group
            })
        }
    }

    const groupService = GroupService(groupModel, {}, {}, {});

    const group = { name: 'D' };
    await groupService.createOne(group);

    expect(groups).toContainEqual(expect.objectContaining(group));
})

test('deleteOne', async () => {
    groupModel = {
        findOne: ({ name }) => {
            return {
                exec: async() => {
                    return groups.filter(group => group.name === name)[0];
                }
            }
        }
    }

    const groupService = GroupService(groupModel, {}, {}, {});

    const name = 'D';

    await groupService.deleteOne(name);

    expect(groups).not.toContainEqual(expect.objectContaining({ name }))
})

test('getSchedule(teacherId) is grouped by days', async () => {
    lessonModel = {
        find: ({ groups: groupName }) => {
            return {
                sort: () => {
                    return {
                        populate: () => {
                            return {
                                exec: async () => {
                                    return lessons.filter(lesson => lesson.groups.includes(groupName));
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    const groupService = GroupService({}, lessonModel, slotModel, dayModel);

    let receivedLessons;
    
    receivedLessons = await groupService.getSchedule('A');

    let isGrouped = true;
    for(let day of Object.keys(receivedLessons)) {
        for(let lesson of receivedLessons[day]) {
            if(lesson.day != day) {
                isGrouped = false;
                break;
            }
        }

        if(!isGrouped)
            break;
    }

    expect(isGrouped).toBeTruthy();
})

test('getSchedule(teacherId, day)', async () => {
    lessonModel = {
        find: ({ groups: groupName, day, week }) => {
            let { $in: dayTypes } = week;
            return {
                sort: () => {
                    return {
                        populate: () => {
                            return {
                                exec: async () => {
                                    return lessons.filter(lesson => {
                                        let isOk = true;
                                        
                                        isOk = isOk && lesson.groups.includes(groupName);
                                        isOk = isOk && lesson.day === day;
                                        isOk = isOk && dayTypes.includes(lesson.week);

                                        return isOk;
                                    });
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    const groupService = GroupService({}, lessonModel, slotModel, dayModel);

    expect(await groupService.getSchedule('A', new Date('2022-02-07'))).toEqual([ lessons[0] ]);
    expect(await groupService.getSchedule('A', new Date('2022-02-08'))).toEqual([ lessons[1] ]);
    expect(await groupService.getSchedule('A', new Date('2022-02-16'))).toEqual([ lessons[2] ]);
    expect(await groupService.getSchedule('B', new Date('2022-02-10'))).toEqual([ lessons[3] ]);
    expect(await groupService.getSchedule('B', new Date('2022-02-11'))).toEqual([ lessons[4] ]);
})

test('getSchedule(teacherId, day, slot)', async () => {
    lessonModel = {
        find: ({ groups: groupName, day, week, slot }) => {
            let { $in: dayTypes } = week;
            return {
                sort: () => {
                    return {
                        populate: () => {
                            return {
                                exec: async () => {
                                    return lessons.filter(lesson => {
                                        let isOk = true;
                                        
                                        isOk = isOk && lesson.groups.includes(groupName);
                                        isOk = isOk && lesson.day === day;
                                        isOk = isOk && dayTypes.includes(lesson.week);
                                        isOk = isOk && lesson.slot === slot;

                                        return isOk;
                                    });
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    const groupService = GroupService({}, lessonModel, slotModel, dayModel);

    expect(await groupService.getSchedule('A', new Date('2022-02-07'), 1)).toEqual([ lessons[0] ]);
    expect(await groupService.getSchedule('A', new Date('2022-02-08'), 2)).toEqual([ lessons[1] ]);
    expect(await groupService.getSchedule('A', new Date('2022-02-16'), 3)).toEqual([ lessons[2] ]);
    expect(await groupService.getSchedule('B', new Date('2022-02-10'), 4)).toEqual([ lessons[3] ]);
    expect(await groupService.getSchedule('B', new Date('2022-02-11'), 5)).toEqual([ lessons[4] ]);
})

test('getSchedule(teacherId, day, undefined, time)', async () => {
    lessonModel = {
        find: ({ groups: groupName, day, week, slot }) => {
            let { $in: dayTypes } = week;
            return {
                sort: () => {
                    return {
                        populate: () => {
                            return {
                                exec: async () => {
                                    return lessons.filter(lesson => {
                                        let isOk = true;
                                        
                                        isOk = isOk && lesson.groups.includes(groupName);
                                        isOk = isOk && lesson.day === day;
                                        isOk = isOk && dayTypes.includes(lesson.week);
                                        isOk = isOk && lesson.slot === slot;

                                        return isOk;
                                    });
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    const groupService = GroupService({}, lessonModel, slotModel, dayModel);

    expect(await groupService.getSchedule('A', new Date('2022-02-07'), undefined, '9:00')).toEqual([ lessons[0] ]);
    expect(await groupService.getSchedule('A', new Date('2022-02-08'), undefined, '11:00')).toEqual([ lessons[1] ]);
    expect(await groupService.getSchedule('A', new Date('2022-02-16'), undefined, '12:30')).toEqual([ lessons[2] ]);
    expect(await groupService.getSchedule('B', new Date('2022-02-10'), undefined, '14:00')).toEqual([ lessons[3] ]);
    expect(await groupService.getSchedule('B', new Date('2022-02-11'), undefined, '16:00')).toEqual([ lessons[4] ]);
})

test('getRemainingSchedule', async () => {
    lessonModel = {
        find: ({ groups: groupName, day, week, slot }) => {
            let { $in: dayTypes } = week;
            let { $in: slots } = slot;
            return {
                exec: async () => {
                    return lessons.filter(lesson => {
                        let isOk = true;
                        
                        isOk = isOk && lesson.groups.includes(groupName);
                        isOk = isOk && lesson.day === day;
                        isOk = isOk && dayTypes.includes(lesson.week);
                        isOk = isOk && slots.includes(lesson.slot);

                        return isOk;
                    });
                }
            }
        }
    }

    dayModel = {
        findOne: ({ date }) => {
            return {
                exec: async () => {
                    return {
                        date: '',
                        type: 'A'
                    };
                }
            }
        }
    }

    let now = new Date();
    let moments = [
        new Date(now),
        new Date(now),
        new Date(now),
        new Date(now),
        new Date(now),
        new Date(now)
    ]

    moments[0].setMinutes(now.getMinutes() - 6);
    moments[1].setMinutes(now.getMinutes() - 4);
    moments[2].setMinutes(now.getMinutes() - 2);
    moments[3].setMinutes(now.getMinutes() + 2);
    moments[4].setMinutes(now.getMinutes() + 4);
    moments[5].setMinutes(now.getMinutes() + 6);

    const getTimeString = (moment) => {
        return `${moment.getHours() < 10 ? '0' : ''}${moment.getHours()}:${moment.getMinutes() < 10 ? '0' : ''}${moment.getMinutes()}`
    }

    slots = [
        {
            number: 1,
            start: getTimeString(moments[0]),
            end: getTimeString(moments[1])
        },
        {
            number: 2,
            start: getTimeString(moments[2]),
            end: getTimeString(moments[3])
        },
        {
            number: 3,
            start: getTimeString(moments[4]),
            end: getTimeString(moments[5])
        }
    ]

    lessons = [
        {
			_id: 'A',
			subject: 'S',
			teacher: {
				_id: '0',
				name: 'A'
			},
			groups: [
				'A'
			],
			week: 'AB',
			day: now.getDay(),
			slot: 1
		},
        {
			_id: 'B',
			subject: 'S',
			teacher: {
				_id: '0',
				name: 'A'
			},
			groups: [
				'A'
			],
			week: 'AB',
			day: now.getDay(),
			slot: 2
		},
        {
			_id: 'C',
			subject: 'S',
			teacher: {
				_id: '0',
				name: 'A'
			},
			groups: [
				'A'
			],
			week: 'AB',
			day: now.getDay(),
			slot: 3
		},
    ]

    const groupService = GroupService({}, lessonModel, slotModel, dayModel);

    expect(await groupService.getRemainingSchedule('A')).toEqual([ lessons[1], lessons[2] ]);
})