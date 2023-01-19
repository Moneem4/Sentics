
const dictionnaryModel = require('../models/dictionnarySchema');
const daysjs = require('dayjs')
//make connection to our database and collections
const { MongoClient } = require("mongodb");
const uri =process.env.DATABASE_PATH
const client = new MongoClient(uri);
 client.connect();
const db = client.db("Sentics");
const coll = db.collection("dictionnaries");
 //dictionnary controller
/*********************************************************************************************/ 
// find all dictionnaries
exports.findAlldictionnaries = async (req, res) => {
    //add try catch to my code
  try {
    const dictionnaries = await coll.find().limit(100).toArray()
    //initialise an empty array for the find result
    let dics =[]
    //add elements to our array from the find command
    console.log('****',dictionnaries ,'*******')
    // return result with the 200 statusCode
    res.status(200).json({ message: "success", data:dictionnaries});
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

 
  //positionsOfHumans
exports.getDataByTime = async (req, res) => {
    try {
      //destruct time input
      const { time } = req.body;
      //convert input time to date type
      const dateEnd = daysjs(time).add(1,'minute').toDate()
      console.log('dateEnd',);
      const dictionnaries =await coll.find({$and:
        [
          {timestamp:{$gt:new Date(time)}},
          {timestamp:{$lt:dateEnd}}
       ]
     
      }).toArray()
      let positions = []
       dictionnaries.forEach(elt=> {
        const instances = elt.instances
        Object.entries(instances).map(instance=> {
          const [key,value] = instance
          positions.push(value.pos_x)
        })
      }) 
      res.status(200).json({ message: "success", data:{ positions, count:dictionnaries.length} });
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





