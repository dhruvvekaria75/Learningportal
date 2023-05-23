const limitter=require("express-rate-limit");

function rateLimitter(time,timetypes,maxReq,message){
    let limit=limitter({
        windowMs:time?time:15*60*1000,
        max:maxReq?maxReq:50,
        standardHeaders:true,
        legacyHeaders:false,
        message:{
            status:false,
            code:message+`Too many requests, please try again after ${time?time+" "+timetypes:"15 minutes"}`||`Too many requests, please try again after ${time?time+" "+timetypes:"15 minutes"}`,
        }
    });

    return limit
}
module.exports=rateLimitter;