import express from 'express'
import config from './server/config.js'
import mongoodb from 'mongoose'
import cors from 'cors'
import router from './server/route/route.js'

mongoodb.Promise = global.Promise
mongoodb.connect(config.mongoUri, {
    useNewUrlParser: true, 
    useUnifiedTopology: true } 
).then(() => {
    console.log("Connected to the database!");
})

mongoodb.connection.on('error', () => {
    throw new Error(`unable to connect to database: ${config.mongoUri}`) 
})

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/',router)

app.get('/',(req,res)=>{
    res.json({"message":"Welcome to DressStore application by Yen Ting Kuo"})
})

app.listen(config.port, (err) => { 
if (err) {
    console.log(err) 
}
    console.info('Server started on port %s.', config.port) 
})

