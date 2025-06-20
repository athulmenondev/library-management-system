const  dotenv =require('dotenv');
dotenv.config();
const express =require('express');

const  cors =require('cors');


const connectdb=require('./config/db');
connectdb();

const app = express();

app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.send('Yr API is rinning');
});

const PORT= process.env.PORT || 5000 ;

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT} `);
});


process.on('unhandledRejection', (err, promise) => {
    console.error(`Error (Unhandled Rejection): ${err.message}`);
    process.exit(1);
});

process.on('uncaughtException', (err, origin) => {
    console.error(`Error (Uncaught Exception): ${err.message}`);
    console.error(`Exception origin: ${origin}`);
    process.exit(1);
});