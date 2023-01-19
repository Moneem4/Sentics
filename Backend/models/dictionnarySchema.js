const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//Model dictionnary
//commit test
const dictionnarySchema = new Schema(
  {
    timestamp: {
      type: Date,
      
    },
   
    instances: [
        {
     pos_x:{
      type: Number , 
    },
    pos_y: {
    type:Number,
    

    },
    vel_x: {
      type: Number, 
    },
 
  vel_y: {
      type: Number, 
    },
    confidence: {
      type: Number,
    },
    sensors: []
  }
], 
}
,    
  { timestamps: true }
);
module.exports = mongoose.model('dictionnary', dictionnarySchema)
