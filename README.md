# Timetable API

Timetable API created as part of the Web Programming course at LNU

## Resources (subject to change)

### Lessons

* **POST** Lesson (`/lessons/`) - add a new lesson

    * **GET** Lesson (`/lessons/:lessonId/`) - all the information about specific lesson by id

    * **DELETE** Lesson (`/lessons/:lessonId/`) - remove a specific lesson by id
    
    * **PATCH** Lesson's teacher (`/lessons/:lessonId/teacher/`) - change a teacher teaching a specific lesson

    * **PATCH** Lesson's groups (`/lessons/:lessonId/groups/`) - change a list of groups attending a specific lesson

    * **PATCH** Lesson's time (`/lessons/:lessonId/time/`) - change a time (day and/or slot) during which a lesson is held

### Groups

* **GET** Groups (`/groups/`) - list of all groups

* **POST** Group (`/groups/`) - add a new group

    * **GET** Group's schedule for a week (`/groups/:groupId/`) - schedule of a particular group for the whole week

    * **PUT** Group (`/groups/:groupId/`) - change the details of a particular group

    * **DELETE** Group (`/groups/:groupId/`) - remove a particular group

        * **GET** Group's schedule for a day (`/groups/:groupId/days/:day/`) - schedule for a particular date or day of the week

            * **GET** Group's schedule for a specific lesson (`/groups/:groupId/days/:day/lessons/:lesson/`)

            * **GET** Group's schedule for a specific time (`/groups/:groupId/days/:day/time/:time/`)

        * **GET** Lessons left for a group for today (`/groups/:groupId/fromnow/`)

### Teachers

* **GET** Teachers (`/teachers/`) - list of all teachers

* **POST** Teachers (`/teachers/`) - add a new teacher

    * **GET** Teacher's schedule for a week (`/teachers/:teacherId/`) - schedule of a particular teacher for the whole week

    * **PUT** Teacher (`/teachers/:teacherId/`) - change the details of a particular teacher

    * **DELETE** Teacher (`/teachers/:teacherId/`) - remove a particular teacher

        * **GET** Teacher's schedule for a day (`/teachers/:teacherId/days/:day/`) - schedule for a particular date or day of the week

            * **GET** Teacher's schedule for a specific lesson (`/teachers/:teacherId/days/:day/lessons/:lesson/`)

            * **GET** Teacher's schedule for a specific time (`/teachers/:teacherId/days/:day/time/:time/`)

        * **GET** Lessons left for a teacher for today (`/teachers/:teacherId/fromnow/`)

### Slots

* **GET** Slots (`/slots/`) - list of all lesson slots by number with specified start time and end time

* **PUT** Slots (`/slots/`) - change lesson slots

    * **GET** Particular lesson slot (`/slots/:slot/`) - start time and end time of a particular lesson slot by number

### Days

* **GET** Days (`/days/`) - list of all days in a semester, specifying whether they are part of the week A, week B or weekends

* **PUT** Days (`/days/`) - change details about days in the semester

    * **GET** Particular day (`/days/:day/`) - whether a particular day is a part of the week A, week B or a weekend