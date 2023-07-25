// to define data schema that will be used.

const mongoose= require("mongoose");
const mongoosePaginate= require("mongoose-paginate-v2");

//Data Schema
const incomeSchema = mongoose.Schema(
    {
        title: {
            required: [true, "Title is required."],
            type: String,
        },
        description: {
            required: [true, "Description is required."],
            type: String,
        },
        type: {
            type: String,
            default: "income",
        },
        amount: {
            required: [true, "Amount is required."],
            type: Number,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId, //Must be MongoDB ID
            ref: "User",
            required: [true, "User ID is required."],
        }
    },
    {
        timestamps: true,
        // for populating user i.e. to store user's name instead of ID
        toJSON: {
            virtuals: true,
        },
        toObject: {
           virtuals: true, 
        },
    }
);

//pagination
incomeSchema.plugin(mongoosePaginate);

const Income = mongoose.model("Income", incomeSchema);

module.exports = Income;