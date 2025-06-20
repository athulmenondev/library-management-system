// backend/models/BorrowRecord.js

const mongoose = require('mongoose');

const borrowRecordSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId, // This is how you reference another document's ID
            ref: 'User', // The 'ref' property tells Mongoose which model this ID refers to
            required: true,
        },
        book: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book', // This refers to the 'Book' model
            required: true,
        },
        borrowDate: {
            type: Date,
            default: Date.now, // Defaults to the current date/time when created
            required: true,
        },
        dueDate: {
            type: Date,
            required: true,
            // You might add custom validation here to ensure dueDate is after borrowDate
        },
        returnDate: {
            type: Date,
            default: null, // Will be null until the book is returned
        },
        status: {
            type: String,
            enum: ['borrowed', 'returned', 'overdue'], // Status of the borrowing
            default: 'borrowed',
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt
    }
);

// Add an index to improve performance for queries related to user and book,
// and potentially to ensure a user can't borrow the same book (if status is 'borrowed')
borrowRecordSchema.index({ user: 1, book: 1 }); // Compound index

const BorrowRecord = mongoose.model('BorrowRecord', borrowRecordSchema);

module.exports = BorrowRecord;