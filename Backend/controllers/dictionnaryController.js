
const dictionnaryModel = require('../models/dictionnarySchema');
//make connection to our database and collections
const { MongoClient } = require("mongodb");
const uri ="mongodb://127.0.0.1:27017/Sentics";
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
  //pagination variables
    var perPage = 10, page = 5
    const cursor = coll.find().limit(20).skip(perPage * page);
    //initialise an empty array for the find result
    let dics =[]
    //add elements to our array from the find command
    await cursor.forEach(function(myDoc) {dics.push(myDoc)});
    // return result with the 200 statusCode
    res.status(200).json({ message: "success", data:dics});
} catch(error){ 
    //in case of server error
    res.status(500).json({
    message: "Failure",
    data: {
        errorMessage: "Server error !"
    }
});}
}
//find one dictionnary
exports.findOnedictionnary = async (req, res) => {
    try {
      const { id } = req.params;
      const dictionnaryExist = coll.findOne({_id:id});
      console.log('dic ',dictionnaryExist)
      if (!dictionnaryExist) res.status(res.statusCode).json("dictionnary doesn't exist");
      res.status(200).json({ message: "success", data: dictionnaryExist });
    } catch (error) {
        res.status(500).json({
            message: "Failure",
            data: {
                errorMessage: "Server error !"
            }
        });
    }
  };
 







