require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const teacherRoutes = require('./routes/teacherRoutes');
const slotRoutes = require('./routes/slotRoutes');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Routes
app.use('/api', teacherRoutes);
app.use('/api', slotRoutes);


if(process.env.NODE_ENV==="production"){
  app.use(express.static("client/build"));
  app.get("*",(req,res)=>{
      res.sendFile(path.resolve(__dirname,'client','build','index.html'));
  })
}

//PORT
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server Running on PORT: ${PORT}`);
})