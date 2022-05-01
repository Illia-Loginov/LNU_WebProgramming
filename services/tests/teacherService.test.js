const TeacherService = require('../teacherService');

let teachers;
let lessons;
let dayModel;
let slotModel;

beforeAll(() => {
    teachers = [
        {
            _id: '0',
            name: 'A'
        },
        {
            _id: '1',
            name: 'B'
        },
        {
            _id: '2',
            name: 'C'
        },
    ]

    teachers = teachers.map(teacherToModify => {
        teacherToModify = {
            ...teacherToModify,
            save: async function() {
                teachers = teachers.map(teacher => {
                    if(teacher._id === this._id)
                        return this;
                    else
                        return teacher;
                })
            },
            deleteOne: async function() {
                teachers = teachers.filter(teacher => teacher._id !== this._id);
            }
        }

        return teacherToModify;
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
				'A'
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
				'A'
			],
			week: 'A',
			day: 5,
			slot: 5
		},
    ]

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
    teacherModel = {
        find: () => {
            return {
                exec: async () => {
                    return teachers
                }
            }
        }
    }

    const teacherService = TeacherService(teacherModel, {}, {}, {});

    expect(await teacherService.getAll()).toEqual(teachers);
})

test('createOne', async () => {
    teacherModel = {
        create: async (teacher) => {
            teachers.push({
                ...teachers[0],
                _id: '3',
                ...teacher
            })
        }
    }

    const teacherService = TeacherService(teacherModel, {}, {}, {});

    const teacher = { name: 'D' };
    await teacherService.createOne(teacher);

    expect(teachers).toContainEqual(expect.objectContaining(teacher));
})

test('editOne', async () => {
    teacherModel = {
        findById: async (id) => {
            return teachers.filter(teacher => teacher._id === id)[0];
        }
    }

    const teacherService = TeacherService(teacherModel, {}, {}, {});

    const id = '3';
    const newValues = {
        name: 'new'
    }

    await teacherService.editOne(id, newValues);

    expect(teachers).toContainEqual(expect.objectContaining({ _id: id, ...newValues }))
})

test('deleteOne', async () => {
    teacherModel = {
        findById: async (id) => {
            return teachers.filter(teacher => teacher._id === id)[0];
        }
    }

    const teacherService = TeacherService(teacherModel, {}, {}, {});

    const id = '3';

    await teacherService.deleteOne(id);

    expect(teachers).not.toContainEqual(expect.objectContaining({ _id: id }));
})

test('getSchedule(teacherId) is grouped by days', async () => {
    lessonModel = {
        find: ({ teacher: teacherId }) => {
            return {
                sort: () => {
                    return {
                        populate: () => {
                            return {
                                exec: async () => {
                                    return lessons.filter(lesson => lesson.teacher._id === teacherId);
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    const teacherService = TeacherService({}, lessonModel, slotModel, dayModel);

    let receivedLessons;
    
    receivedLessons = await teacherService.getSchedule('0');

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
        find: ({ teacher: teacherId, day, week }) => {
            let { $in: dayTypes } = week;
            return {
                sort: () => {
                    return {
                        populate: () => {
                            return {
                                exec: async () => {
                                    return lessons.filter(lesson => {
                                        let isOk = true;
                                        
                                        isOk = isOk && lesson.teacher._id === teacherId;
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

    const teacherService = TeacherService({}, lessonModel, slotModel, dayModel);

    expect(await teacherService.getSchedule('0', new Date('2022-02-07'))).toEqual([ lessons[0] ]);
    expect(await teacherService.getSchedule('0', new Date('2022-02-08'))).toEqual([ lessons[1] ]);
    expect(await teacherService.getSchedule('0', new Date('2022-02-16'))).toEqual([ lessons[2] ]);
    expect(await teacherService.getSchedule('1', new Date('2022-02-10'))).toEqual([ lessons[3] ]);
    expect(await teacherService.getSchedule('1', new Date('2022-02-11'))).toEqual([ lessons[4] ]);
})

test('getSchedule(teacherId, day, slot)', async () => {
    lessonModel = {
        find: ({ teacher: teacherId, day, week, slot }) => {
            let { $in: dayTypes } = week;
            return {
                sort: () => {
                    return {
                        populate: () => {
                            return {
                                exec: async () => {
                                    return lessons.filter(lesson => {
                                        let isOk = true;
                                        
                                        isOk = isOk && lesson.teacher._id === teacherId;
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

    const teacherService = TeacherService({}, lessonModel, slotModel, dayModel);

    expect(await teacherService.getSchedule('0', new Date('2022-02-07'), 1)).toEqual([ lessons[0] ]);
    expect(await teacherService.getSchedule('0', new Date('2022-02-08'), 2)).toEqual([ lessons[1] ]);
    expect(await teacherService.getSchedule('0', new Date('2022-02-16'), 3)).toEqual([ lessons[2] ]);
    expect(await teacherService.getSchedule('1', new Date('2022-02-10'), 4)).toEqual([ lessons[3] ]);
    expect(await teacherService.getSchedule('1', new Date('2022-02-11'), 5)).toEqual([ lessons[4] ]);
})

test('getSchedule(teacherId, day, undefined, time)', async () => {
    lessonModel = {
        find: ({ teacher: teacherId, day, week, slot }) => {
            let { $in: dayTypes } = week;
            return {
                sort: () => {
                    return {
                        populate: () => {
                            return {
                                exec: async () => {
                                    return lessons.filter(lesson => {
                                        let isOk = true;
                                        
                                        isOk = isOk && lesson.teacher._id === teacherId;
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

    const teacherService = TeacherService({}, lessonModel, slotModel, dayModel);

    expect(await teacherService.getSchedule('0', new Date('2022-02-07'), undefined, '9:00')).toEqual([ lessons[0] ]);
    expect(await teacherService.getSchedule('0', new Date('2022-02-08'), undefined, '11:00')).toEqual([ lessons[1] ]);
    expect(await teacherService.getSchedule('0', new Date('2022-02-16'), undefined, '12:30')).toEqual([ lessons[2] ]);
    expect(await teacherService.getSchedule('1', new Date('2022-02-10'), undefined, '14:00')).toEqual([ lessons[3] ]);
    expect(await teacherService.getSchedule('1', new Date('2022-02-11'), undefined, '16:00')).toEqual([ lessons[4] ]);
})

test('getRemainingSchedule', async () => {
    lessonModel = {
        find: ({ teacher: teacherId, day, week, slot }) => {
            let { $in: dayTypes } = week;
            let { $in: slots } = slot;
            return {
                exec: async () => {
                    return lessons.filter(lesson => {
                        let isOk = true;
                        
                        isOk = isOk && lesson.teacher._id === teacherId;
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

    const teacherService = TeacherService({}, lessonModel, slotModel, dayModel);

    expect(await teacherService.getRemainingSchedule('0')).toEqual([ lessons[1], lessons[2] ]);
})