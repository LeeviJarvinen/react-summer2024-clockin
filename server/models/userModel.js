import mongoose from 'mongoose';

const clockSchema = new mongoose.Schema({
    from: String,
    to: String,
    hours: String,
    date: String,
});

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    job: {
        type: String,
    },
    roles: {
        Employee: {
            type: Boolean,
            default: true,
            },
        Editor: {
            type: Boolean,
            default: false,
        },
        Admin: {
            type: Boolean,
            default: false,
        }
    },
    
    personal_info: {
        firstname: {
            type: String,
            default: ''
        },
        lastname: {
            type: String,
            default: ''
        },
        address: {
            type: String,
            default: ''
        },
        phonenumber: {
            type: String,
            default: ''
        },
    },

    hours: [clockSchema]

}, {strict: true})

export default mongoose.model('Users', userSchema) 