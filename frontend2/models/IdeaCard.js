const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ideaCardSchema = new Schema({
    content: {
        type: 'string',
        required: true,
    },
    group_id: {
        type: 'string',
        required: true
    },
    user_id: {
        type: 'string',
        required: true
    }

}, {timestamps: true})


const IdeaCard = mongoose.model("IdeaCard", ideaCardSchema)

module.exports = IdeaCard