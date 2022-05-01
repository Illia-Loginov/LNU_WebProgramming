const LessonService = require('../lessonService');

let lessons;

beforeAll(() => {
    lessons = [
        {
			_id: 'A',
			subject: 'S',
			teacher: '0',
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
			teacher: '0',
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
			teacher: '0',
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
			teacher: '0',
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
			teacher: '0',
			groups: [
				'A'
			],
			week: 'A',
			day: 5,
			slot: 5
		},
    ]

    lessons = lessons.map(lessonToModify => {
        lessonToModify = {
            ...lessonToModify,
            save: async function() {
                lessons = lessons.map(lesson => {
                    if(lesson._id === this._id)
                        return this;
                    else
                        return lesson;
                })
            },
            deleteOne: async function() {
                lessons = lessons.filter(lesson => lesson._id !== this._id);
            }
        }

        return lessonToModify;
    })
})

test('createOne', async () => {
    lessonModel = {
        create: async (lesson) => {
            lessons.push({
                ...lessons[0],
                _id: 'F',
                ...lesson
            })
        }
    }

    const lessonService = LessonService(lessonModel);

    const lesson = {
        subject: 'F',
        teacher: '0',
        groups: [ 'A' ],
        week: 'AB',
        day: 1,
        slot: 2
    }

    await lessonService.createOne(lesson);

    expect(lessons).toContainEqual(expect.objectContaining(lesson));
})

test('getOne', async () => {
    lessonModel = {
        findById: (id) => {
            return {
                populate: () => {
                    return {
                        exec: async () => {
                            return lessons.filter(lesson => lesson._id === id)[0];
                        }
                    }
                }
            }
        }
    }

    const lessonService = LessonService(lessonModel);

    expect(await lessonService.getOne('A')).toEqual(lessons[0]);
})

test('deleteOne', async () => {
    lessonModel = {
        findById: async (id) => {
            return lessons.filter(lesson => lesson._id === id)[0];
        }
    }

    const lessonService = LessonService(lessonModel);

    const id = 'F';

    await lessonService.deleteOne(id);

    expect(lessons).not.toContainEqual(expect.objectContaining({ _id: id }));
})

test('editOne', async () => {
    lessonModel = {
        findById: async (id) => {
            return lessons.filter(lesson => lesson._id === id)[0];
        }
    }

    const lessonService = LessonService(lessonModel);

    const id = 'E';
    const newValues = {
        week: 'B',
        slot: 6,
        groups: [ 'A', 'B' ]
    }

    await lessonService.editOne(id, newValues);

    expect(lessons).toContainEqual(expect.objectContaining({ _id: id, ...newValues }))
})