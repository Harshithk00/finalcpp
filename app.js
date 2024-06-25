import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import memorystore from 'memorystore';
import flash from 'connect-flash';
import path from 'path';
import { fileURLToPath } from 'url';
import env from 'dotenv';
import passport from './passport-config.js';
import indexRoutes from './routes/index.js';
import authRoutes from './routes/auth.js';
import quizRoutes from './routes/quiz.js';
import cookieParser from 'cookie-parser'; 




env.config();

const app = express();
const MemoryStore = memorystore(session);

app.use(cookieParser());
app.use(session({
  secret: process.env.SESSIONSEC,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 86400000, httpOnly: true },
  store: new MemoryStore({ checkPeriod: 86400000 }),
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());


     
     app.use('/', indexRoutes);
     app.use('/signup', indexRoutes);
     app.use('/login', indexRoutes);
     app.use('/dashboard', indexRoutes);
     app.use('/logout', indexRoutes);
     
     app.use('/api', authRoutes);
     app.use('/api', authRoutes);

 
     app.use('/', quizRoutes);
     app.use('/', quizRoutes);

     const port = process.env.PORT || 3000;

     app.listen(port, () => {
       console.log(`Server running on port ${port}`);
     });