require('dotenv').config();
const express = require('express');
const connectDB = require('./config/connect_db');
const cors = require('cors');
const dictionnaryRoute = require('./routes/dictionnaryRoute');
const app = express();
app.use(express.json());
app.use(cors());
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
const morgan = require('morgan');
const ecsFormat = require("@elastic/ecs-morgan-format");
const PORT = process.env.PORT || 3000;
app.use(morgan(ecsFormat('tiny')));
//call connection function to our database
connectDB();
//listen to our port(5000)
app.listen(PORT, () => {
    console.log(`🚀 Server  ready at http://localhost:${PORT}`);
});
//call dictionnary route
app.use("/dictionnary", dictionnaryRoute);
// handler for 500
app.use((res) => {
  res.status(500).send('Connection Error!')
})
