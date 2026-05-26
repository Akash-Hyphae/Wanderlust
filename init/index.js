require("dotenv").config();

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = process.env.ATLASDB_URL;

console.log(MONGO_URL);

main()
.then(() => {
    console.log("connected to DB");
})
.catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await Listing.deleteMany({});

    initData.data = initData.data.map((obj) => ({
        ...obj,
        owner: "6a15ea4d7596854d564e075c",
        geometry: {
            type: "Point",
            coordinates: [77.2090, 28.6139],
        },
    }));

    await Listing.insertMany(initData.data);

    console.log("data was initialized");
};

initDB();