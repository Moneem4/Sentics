
const dictionnaryModel = require('../models/dictionnarySchema');
//make connection to our database and collections
const { MongoClient } = require("mongodb");
const uri =process.env.DATABASE_PATH
const client = new MongoClient(uri);
 client.connect();
const db = client.db("Sentics");
const coll = db.collection("dictionaries");
 //dictionnary controller
/*********************************************************************************************/ 
// find all dictionnaries
exports.findAlldictionnaries = async (req, res) => {
    //add try catch to my code
  try {
    const dictionnaries =coll.find().limit(100)
    //initialise an empty array for the find result
    let dics =[]
    //add elements to our array from the find command
    await dictionnaries.forEach(function(myDoc) {dics.push(myDoc)});
    // return result with the 200 statusCode
    res.status(200).json({ message: "success", data:dics});
} catch(error){ 
  console.log(error)
    //in case of server error
    res.status(500).json({
    message: "Failure",
    data: {
        errorMessage: "Server error !"
    }
});}
}

 //numberOfHumansInDate
exports.numberOfHumansInDate = async (req, res) => {
    try {
      const { time } = req.body;
      const date = new Date(time)
      const dictionnaries =await coll.count({timestamp:date});
      console.log(dictionnaries)
      res.status(200).json({ message: "success", data: dictionnaries });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Failure",
            data: {
                errorMessage: "Server error !"
            }
        });
    }
  };


  //positionsOfHumans
exports.positionsOfHumans = async (req, res) => {
    try {
      const { time } = req.body;
      const date = new Date(time)
    // var unixTimestamp = Math.floor(new Date(time).getTime()/1000);
      console.log(date)
      const dictionnaries =coll.find({timestamp:date});
       let dics =[]
       await dictionnaries.forEach(function(myDoc) {dics.push(myDoc)}); 
      console.log("dics ",dictionnaries) 
      res.status(200).json({ message: "success", data: dics });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Failure",
            data: {
                errorMessage: "Server error !"
            }
        });
    }
  };





