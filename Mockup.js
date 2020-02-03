const LearnerUser = require("./LearnerUser")
const TeacherUser = require("./TeacherUser")
const Subject = require("./Subject")
const Chapter = require("./Chapter")
const Exercise = require("./Exercise")
const mongoose = require("mongoose")
const _ = require("lodash")

const p24 = (n) => _.padStart(n, 24, '0')

TeacherUser.create({
    _id: p24('1'),
    teacherID: p24('t1'),
    username: 'teacher1',
    password: '12345',
    email: 'teacher1@company.com',
    subjectID: [p24('1')]
})

LearnerUser.create({
    _id: p24(1),
    learnerID: p24('l1'),
    username: 'pimwipa',
    password: '12345',
    email: 'peaw123@peaw.com',
    subjectID: [p24('1')],
}, function (err, small) {
    if (err) return handleError(err);
});

Subject.create({
    _id: p24('1'),
    subjectID: p24('s1'),
    chapterID: [p24('1')],
    subjectName: 'subject1',
    exerciseID: [p24('1')]

})

Chapter.create({
    _id: p24('1'),
    chapterID: p24('c1'),
    chapterName: String,
    content: String,
})

Exercise.create({
    _id: p24('1'),
    exerciseID: p24('e1'),
    type: 'choice',
    preTest: true,
    postTest: false,
    Question: [],
})






// TeacherUser.create({
//     teacherID: '001',
//     username: 'Peaw',
//     password: '1234',
//     email: 'peaw@peaw.com'
// }, function (err, small) {
//     if (err) return handleError(err);
// });

// Subject.create({
//     subjectID: '01',
//     chapterID: '01',
//     subjectName: 'Test',
//     learnerID: '005',
//     teacherID: '001',
//     chapterID: ['01'],
//     exerciseID: [02]
// }, function (err, small) {
//     if (err) return handleError(err);
// });

// Chapter.create({
//     subjectID: '01',
//     chapterID: '01',
//     chapterName: 'TESTER',
//     content: 'content',
//     learnerID: '005',
//     teacherID: '001',
// }, function (err, small) {
//     if (err) return handleError(err);
// });

// Exercise.create({
//     exerciseID: '02',
//     subjectID: '01',
//     teacherID: '001',
//     type: '01',

// }, function (err, small) {
//     if (err) return handleError(err);
// });