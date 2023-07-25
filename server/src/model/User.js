// to define data schema that will be used.


const mongoose= require("mongoose");
const bcrypt= require("bcryptjs");
//Data Schema

const userSchema = mongoose.Schema(
    {
        firstname: {
            required: [true, "First name is required."],
            type: String,
        },
        lastname: {
            required: [true, "Last name is required."],
            type: String,
        },
        email: {
            required: [true, "Email is required."],
            type: String,
        },
        password: {
            required: [true, "Password is required."],
            type: String,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
    },
    {
        toObject:{
            virtuals: true,
        },
        toJSON:{
            virtuals: true,
        },
        timestamps: true,
    }
);


//Virtual Properties of MongoDB
userSchema.virtual("expenses", {
    ref: "Expense",
    foreignField: "user",
    localField: "_id",
});

userSchema.virtual("income", {
    ref: "Income",
    foreignField: "user",
    localField: "_id",
});

// Hashing the password before saving it to the database

userSchema.pre("save", async function (next) {
if(!this.isModified("password"))
{
    next();
}
   const salt= await bcrypt.genSalt(10);
   this.password = await bcrypt.hash(this.password, salt);
   next();
});

//Verifying the password

userSchema.methods.isPasswordMatch = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Compiling the schema into a model
const User= mongoose.model("User", userSchema);
module.exports = User;