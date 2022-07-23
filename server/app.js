const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const xss = require('xss-clean');
const sanitize = require('express-mongo-sanitize');
const cookieParser = require('cookie-parser');

const errorHandler = require('./tools/error-handler');
const authRouter = require('./routes/auth-route');
const memberRouter = require('./routes/member-route');
const postRouter = require('./routes/post-route');
const categoryRouter = require('./routes/category-route');
const tagRouter = require('./routes/tag-route');
const savePostRouter = require('./routes/save-post-route');
const daftRouter = require('./routes/daft-route');

require('dotenv').config();
require('./db');

const port = process.env.PORT || 8080;

app.use(cors());
app.use(morgan('dev'));
app.use(xss());
app.use(sanitize());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/member', memberRouter);
app.use('/post', postRouter);
app.use('/category', categoryRouter);
app.use('/tag', tagRouter);
app.use('/save-post', savePostRouter);
app.use('/daft', daftRouter)

app.use(errorHandler);

app.listen(port, () => {
    console.log(`server is running in port ${port}...`);
})