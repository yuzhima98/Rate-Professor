const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//https://mongoosejs.com/docs/populate.html#populate_an_existing_mongoose_document

const schema = new Schema({
    prof: { type: Schema.Types.ObjectId, ref: 'User'},
    course: { type: Schema.Types.ObjectId, ref: 'Course'},
    startTime: { type: Date, required: true},
    duration: { type: Number, required: true, },
    accessCode: { type: Number, required: true, unique: true},
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }]

});

//this makes startTime and course object id unique because it makes no sense to have two identical attendance tracker documents.
schema.index({startTime:1, course:1}, { unique: true });

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Attendance', schema);
