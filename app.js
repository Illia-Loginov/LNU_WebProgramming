const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// App initialization
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/lessons/', require('./routes/lessonRoutes'));
app.use('/groups/', require('./routes/groupRoutes'));
app.use('/teachers/', require('./routes/teacherRoutes'));
app.use('/slots/', require('./routes/slotRoutes'));
app.use('/days/', require('./routes/dayRoutes'));

app.get('/', (req, res) => { res.send('Timetable API') });

// Server launch
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`Server listening on port ${PORT}`)))
    .catch(error => console.log('DB connection and app.listen', error));