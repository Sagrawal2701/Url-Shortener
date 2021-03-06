const Express = require('express');
const path = require("path");
const app = Express();
const connectDB = require('./config/db');
require('dotenv').config({ path: './config/.env' });

connectDB();

app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());

app.use('/public', Express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/index'));
app.use('/api', require('./routes/urls'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + "/views/urlshortener.html");
})

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`);
});
