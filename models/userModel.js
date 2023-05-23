const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const crypto=require('crypto');

let userSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    user_image:{
        type:String,
        default:"https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"
    },
    email:{
        type:String,
        required:true,
        unique:true,
        index:true
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
        index:true
    },
    password:{
        type:String,
        required:true,
    },
    roles:{
        type:String,
        default:"user",
    },
    profession:{
        type:String,
        required:true
    },
    isblocked:{
        type:Boolean,
        default:false
    },
    passwordChangedAt:Date,
    passwordResetToken:String,
    passwordResetExpires:Date,
    stripe_account_id:String,
    stripe_seller:{},
    stripeSession:{}
 },
 {
    timestamps:true
 }
)
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next()
    }
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
    next()
})

userSchema.methods.isPasswordMatched=async function(enteredpassword){
    return await bcrypt.compare(enteredpassword,this.password);
}

userSchema.methods.createPasswordResetToken=async function(){
    const resettoken=crypto.randomBytes(32).toString("hex");
    this.passwordResetToken=crypto
       .createHash("sha256")
       .update(resettoken)
       .digest("hex");
    this.passwordResetExpires=Date.now()+30*60*1000//30 minutes
    return resettoken;
}

module.exports=mongoose.model("User",userSchema)