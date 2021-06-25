require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const teacherRoutes = require('./routes/teacherRoutes');
const slotRoutes = require('./routes/slotRoutes');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'build')));

//Routes
app.use('/api', teacherRoutes);
app.use('/api', slotRoutes);


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


//PORT
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server Running on PORT: ${PORT}`);
})