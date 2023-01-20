
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
  //numberOfHumans
exports.getNumberOfHumansByTime = async (req, res) => {
    try {
      //destruct time1 and time2  inputs
      const { time1,time2 } = req.query;
      //find dictionnaries by time interval
      
      const dictionnaries =await coll.find({$and:
        [
          {timestamp:{$gt:new Date(time1)}},
          {timestamp:{$lt:new Date(time2)}}
       ]
     
      }).toArray()
      let result = []
       dictionnaries.forEach(elt=> {
        const instances = elt.instances
        let  time=elt.timestamp
        let numberHumans= Object.entries(instances).length
        console.log("number ",numberHumans)
        result.push({numberHumans,time})
      }) 
      res.status(200).json({ message: "success", data:result });
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
exports.getPositionsByTime = async (req, res) => {
  try {
    //destruct time1 and time 2  inputs
    const { time1,time2 } = req.query;
    
    const dictionnaries =await coll.find({$and:
      [
        {timestamp:{$gt:new Date(time1)}},
        {timestamp:{$lt:new Date(time2)}}
     ]
   
    }).toArray()
    let positions = []
     dictionnaries.forEach(elt=> {
      const instances = elt.instances
      Object.entries(instances).map(instance=> {
        const [key,value] = instance
        px=value.pos_x;
        py=value.pos_y;
       vy=value.vel_y
         positions.push({px,py,vy})
      })
    }) 
    res.status(200).json({ message: "success", data:{ positions} });
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




