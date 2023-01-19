
const dictionnaryModel = require('../models/dictionnarySchema');
const { MongoClient } = require("mongodb");
const uri ="mongodb://127.0.0.1:27017/Sentics";
const client = new MongoClient(uri);
 //dictionnary controller
/*********************************************************************************************/ 
// find all dictionnaries
exports.findAlldictionnaries = async (req, res) => {
  //try {
  
    await client.connect();
    const db = client.db("Sentics");
    const coll = db.collection("dictionaries");
    // find code goes here
    const cursor = coll.find();
    let p=cursor.count()
    let dics=[]
   // await cursor.forEach(function(myDoc) { dics.push(myDoc)});
   
let dictionaries=[]
for(let i=0;i<10;i++)
{
dictionaries.push(cursor[i])
}
    res.status(200).json({ message: "success", data: p});
   /*  const dictionnaries = await dictionnaryModel.find();
    console.log("dictionnaries ",dictionnaries)
    if (!dictionnaries || dictionnaries.length===0) 
    {res.status(res.statusCode).json("dictionnaries doesn't exist");}
    else
    {res.status(200).json({ message: "success", data: dictionnaries });}
  } catch (error) {
    res.status(500).json({
        message: "Failure",
        data: {
            errorMessage: "Server error !"
        }
    });  
 };*/

//}
}
//find one dictionnary
exports.findOnedictionnary = async (req, res) => {
    try {
      const { id } = req.params;
      const dictionnaryExist = await dictionnaryModel.findOne({ _id: id });
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
 







