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
  const origin = req.get('Origin');
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');

  // Handle preflight and Private Network Access
  if (req.method === 'OPTIONS') {
    if (req.headers['access-control-request-private-network']) {
      res.setHeader('Access-Control-Allow-Private-Network', 'true');
    }
    return res.sendStatus(204);
  }
  next();
});

// You can still use cors() for convenience but keep it after the above or configured similarly
app.use(cors({
  origin: (origin, cb) => {
    // allow non-browser requests (no origin) and allowedOrigins
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
    cb(new Error('Not allowed by CORS'));
  },
  credentials: true
}));

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