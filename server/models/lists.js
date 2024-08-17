import mongoose from 'mongoose';

const listSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
   description: {
        type: String,
        required: true
    },  
    isChecked: {
        type: Boolean,
        default: false
    },
});

export default mongoose.model('List', listSchema);