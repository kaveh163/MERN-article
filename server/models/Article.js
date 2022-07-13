const mongoose = require('mongoose');
const {Schema} =  mongoose;

const articleSchema = new Schema ({
    title: {type: String, required: [true, 'title is required']},
    body: {type: String, required: [true, 'body is required']},
    user: {type: String, required: [true, 'user is required']}
})
let Article = mongoose.model('Article', articleSchema);
module.exports = Article;