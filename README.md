# Timetable API

Timetable API created as part of the Web Programming course at LNU

## Resources (subject to change)

* Groups (`/groups`) - all the groups

    * Days (`/groups/:groupId/days`) - timetable for this group for the whole week

        * Lessons (`/groups/:groupId/days/:dayNum/lessons`) - timetable for this group for this day
    
    * From now (`/groups/:groupId/now`) - lessons left for this group for today

* Subjects (`/subjects`) - all the subjects

    * Days (`/subjets/:subjectId/days`) - timetable for this subject for the whole week

        * Lessons (`/subjets/:subjectId/days/:dayNum/lessons`) - timetable for this subject for this day
    
    * From now (`/subjets/:subjectId/now`) - all the lessons left for today

* Teachers (`/teachers`) - all the teachers

    * Days (`/teachers/:teacherId/days`) - timetable for this teacher for the whole week

        * Lessons (`/teachers/:teacherId/days/:dayNum/lessons`) - timetable for this teacher for this day
    
    * From now (`/teachers/:teacherId/now`) - lessons left for this teacher for today