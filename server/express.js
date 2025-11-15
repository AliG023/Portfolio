import express from 'express'
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";
import authRoutes from './routes/auth.route.js'

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = [
  'http://localhost:5173',
  'https://ali-graham-portfolio.onrender.com'
];

app.use((req, res, next) => {
  const origin = req.get('Origin') || req.get('origin');
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Vary', 'Origin');
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');

  if (req.method === 'OPTIONS') {
    // If the browser asked for Private Network Access, allow it for dev
    if (req.headers['access-control-request-private-network'] !== undefined) {
      res.setHeader('Access-Control-Allow-Private-Network', 'true');
    }
    return res.sendStatus(204);
  }
  next();
});

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