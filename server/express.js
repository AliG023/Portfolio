import express from 'express'
import morgan from 'morgan'
import authRoutes from './routes/auth.route.js'

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', authRoutes);
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ 'error': err.name + ': ' + err.message });
    }else if (err) {
        res.status(400).json({ 'error': err.name + ': ' + err.message });
        console.log(err);
    }
});

export default app