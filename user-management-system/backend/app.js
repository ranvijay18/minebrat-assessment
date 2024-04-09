const express= require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./utils/database');

const app = express();

app.use(cors());


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

const userRoute = require('./routes/user');


app.use(userRoute);


// sequelize.sync({force:true})
// .then(() =>
//     app.listen(7000)
// )

sequelize.sync()
.then(() =>
    app.listen(7000)
)