import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    imageUrl: String,
    text:{
        type: String,
        required: true,
        unique: true,
    },
},
{
    timestamps: true,
},
);

export default mongoose.model('Post', PostSchema)