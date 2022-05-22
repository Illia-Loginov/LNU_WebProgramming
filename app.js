const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const logger = require('./logger/logger');
require('dotenv').config();

// App initialization
const app = express();

// Middleware
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/lessons/', require('./routes/lessonRoutes'));
app.use('/groups/', require('./routes/groupRoutes'));
app.use('/teachers/', require('./routes/teacherRoutes'));
app.use('/slots/', require('./routes/slotRoutes'));
app.use('/days/', require('./routes/dayRoutes'));
app.use('/admins/', require('./routes/adminRoutes'));

app.get('/', (req, res) => { res.send('Timetable API') });

// Server launch
const PORT = Number(process.env.PORT) || 5000;
mongoose.connect(process.env.CONNECTION_URL)
    .then(() => app.listen(PORT, () => logger.info(`Server listening on port ${PORT}`)))
    .catch(error => logger.error(error));