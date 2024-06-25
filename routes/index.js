import express from 'express';
import cookieParser from 'cookie-parser'; 

const router = express.Router();
const app = express();
app.use(cookieParser());

router.get('/', (req, res) => {
  if(req.isAuthenticated()) {
    res.redirect('/dashboard');
  } else {
    res.redirect("/login");
  }
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/forgot-password', (req, res) => {
  res.render('forgot-password');
});

router.get('/dashboard', async(req, res) => {
  if (req.isAuthenticated()) {
    const users = req.user;
    
    res.cookie('users', users, { maxAge: 24 * 60 * 60 * 1000});
    
    res.render("dashboard",{errtext1:req.flash('errtext1') || null});
  } else {
    res.redirect("/");
  }
});

router.post('/logout', (req, res) => {
  req.logout(function(err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

export default router;