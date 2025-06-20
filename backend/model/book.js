const mongoose = require('mongoose');

const bookSchema = mongoose.Schema(
    {
        titile:{
            type:String,
            required:[true,'Please add a title'],
            trim:true,
            uniqie:true,
        },
        author:{
            type:String,
            required:[true,'Please add an author'],
            trim:true,
        },
        isbn:{
            type:String,
            required:[true,'Please add an isbn'],
            trim:true,
            uniqie:true,
        },
        genre:{
            type:[String],
            default:[],
        },
        publicationYear:{
            type:Number,
            required:[true,'Please add the year'],
        },
        description:{
            type:String,
            default:'',
            trim:true,
        },
        availableCopies:{
            type:Number,
            required:[true,"Please specify the available copies"],
            min:0,
            default:1,
        },
        totalCopies:{
            type:Number,
            required:[true,"Please specify the total copies"],
            min:1,
            default:1,
        },
    },{
        timestamp:true,
    }
);

const Book = mongoose.model('Book',bookSchema);
module.exports=Book;