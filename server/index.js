require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./connectionPool');
const teacherRoutes = require('./routes/teacherRoutes');
const slotRoutes = require('./routes/slotRoutes');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Routes
app.use('/api', teacherRoutes);
app.use('/api',slotRoutes);
//PORT
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server Running on PORT: ${PORT}`);
})