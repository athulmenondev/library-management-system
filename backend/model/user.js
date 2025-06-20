// backend/models/User.js

const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, 'Please add a username'],
            unique: true, // Username must be unique
            trim: true,
            minlength: [3, 'Username must be at least 3 characters long'],
        },
        email: {
            type: String,
            required: [true, 'Please add an email'],
            unique: true, // Email must be unique
            trim: true,
            lowercase: true, // Store emails in lowercase for consistency
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                'Please fill a valid email address',
            ], // Basic email regex validation
        },
        password: {
            type: String,
            required: [true, 'Please add a password'],
            minlength: [6, 'Password must be at least 6 characters long'],
            // In a real app, this would store a HASHED password, not plain text.
            // We'll add hashing (e.g., with bcrypt) in a later stage.
        },
        role: {
            type: String,
            enum: ['member', 'librarian', 'admin'], // Restrict values to these options
            default: 'member', // Default role for new users
        },
        // Optional: Could add fields like firstName, lastName, registrationDate etc.
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;