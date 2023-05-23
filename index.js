const express=require('express');
const dbConnect = require('./config/dbConnect');
const { notFound,handleError} = require('./middlewares/errorHandler');
const userRouter = require('./routes/userRoutes');
const app=express();
const dotenv=require("dotenv").config();
const PORT=process.env.PORT||7000;
const bodyParser=require("body-parser");
const MongoStore = require('connect-mongo');
const googleRouter = require('./routes/googleRoutes');
require("./utils/passport");
const passport=require("passport");
const session=require("express-session");
const tutCatRouter = require('./routes/tutCatRoutes');
const tutorialRouter = require('./routes/tutorialRouter');
const  newsletterRouter = require('./routes/newsletterRoutes');
const reviewRouter = require('./routes/reviewRoute');
const contactRouter = require('./routes/contactRoute');
const videoRouter = require('./routes/videoRoutes');
const docRouter = require('./routes/documnetationRoutes');
const docCatRouter = require('./routes/docCatRoutes');
const blogCatRouter = require('./routes/blogCatRoute');
const blogRouter = require('./routes/blogRoute');
const videoCatmodel = require('./models/videoCatmodel');
const videoCatRouter = require('./routes/videoCatRoute');
const courseCatRouter = require('./routes/courseCatRoute');
const courseRouter = require('./routes/courseRoute');
const rateLimitter=require("./utils/reqLimit");
const workRouter = require('./routes/workRouter');

//connect with database
dbConnect();
app.use(
    session({
        resave:false,
        saveUninitialized:false,
        secret:"mysecret",
        store:MongoStore.create({
            mongoUrl:process.env.MONGODB_URI,
            ttl:12*60*60
        })
    })
);
app.get("/",(req,res)=>{
     res.send("Hello from Job Portal Server")
})
app.get("/",(req,res)=>{
     res.send('<a href="http://localhost:6000/google">login with google</a>')
})

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))

app.use("/api",rateLimitter(60*60*1000,"Secs",100,"Only 100 request allow"));
app.set('trust proxy', 1);

app.use("/api/user",userRouter);
app.use("/",googleRouter);
app.use("/api/tutorial/category",tutCatRouter);
app.use("/api/tutorial",tutorialRouter);
app.use("/api/newsletter",newsletterRouter);
app.use("/api/review",reviewRouter);
app.use("/api/contact",contactRouter);
app.use("/api/video",videoRouter);
app.use("/api/video/category",videoCatRouter);
app.use("/api/doc",docRouter);
app.use("/api/doc/category",docCatRouter);
app.use("/api/blog/category",blogCatRouter);
app.use("/api/blog",blogRouter);
app.use("/api/course/category",courseCatRouter);
app.use("/api/course",courseRouter);
app.use("/api/work",workRouter);

app.use(notFound);
app.use(handleError);

//listen at port number 
app.listen(PORT,()=>{
    console.log(`app is working on ${PORT}`)
})

