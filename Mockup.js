const LearnerUser = require("./model/LearnerUser")
const TeacherUser = require("./model/TeacherUser")
const Subject = require("./model/Subject")
const Chapter = require("./model/Chapter")
const Exercise = require("./model/Exercise")
const mongoose = require("mongoose")
const _ = require("lodash")

const p24 = (n) => _.padStart(n, 24, '0')

TeacherUser.create({
    _id: p24('1'),
    username: 'teacher2',
    password: '12345',
    email: 'teacher2@company.com',
    subjectID: [p24('1')]
})

LearnerUser.create({
    _id: p24(1),
    username: 'pimwipa',
    password: '12345',
    email: 'peaw123@peaw.com',
    subjectID: [p24('1')],
}, function (err, small) {
    if (err) return err;
});

Subject.create({
    _id: p24('1'),
    chapterID: [p24('1'),p24('2')],
    subjectName: 'subject1',
    exerciseID: [p24('1')]

})

Chapter.create({
    _id: p24('1'),
    chapterName: "chapter1",
    content: "content",
})

Chapter.create({
    _id: p24('2'),
    chapterName: "chapter2",
    content: "content",
})

Exercise.create({
    _id: p24('1'),
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