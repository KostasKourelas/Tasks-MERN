import mongoose from "mongoose";


const taskSchema = mongoose.Schema(
    {
        subject: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        status: {
            type: Number,
            required: true,
        },
        priority: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true
    }
)



export const Task = mongoose.model('Task', taskSchema);