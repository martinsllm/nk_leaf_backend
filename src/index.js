require('dotenv').config();

const cors = require('cors');
const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(express.json({limit: '50mb'}));

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
	res.setHeader("Access-Control-Allow-Credentials", "true");
	res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
	app.use(cors());
	next();
});

app.use(morgan('dev'));
app.use(require('./routes/routes'));

app.listen(process.env.PORT || 8080);