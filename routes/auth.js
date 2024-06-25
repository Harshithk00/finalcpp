import express from 'express';
import bcrypt from 'bcrypt';
import passport from '../passport-config.js';
import db from '../db.js'; // Assuming you have db connection exported from a separate file

const router = express.Router();
const saltRounds = 10;

router.post('/signup', async (req, res) => {
  const { name, password, usn } = req.body;

  try {
    const checkResult = await db.query("SELECT * FROM users WHERE name = $1", [name]);

    if (checkResult.rows.length > 0) {
      res.redirect("/");
    } else {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
        } else {
          const result = await db.query("INSERT INTO users (name, password, usn) VALUES ($1, $2, $3) RETURNING *", [name, hash, usn]);
          res.redirect("/");
        }
      });
    }
  } catch (err) {
    console.error(err);
    res.render("signup", { error: "There is something wrong. Please try again" });
  }
});

router.post('/login', passport.authenticate('locallogin2', {
  successRedirect: "/dashboard",
  failureRedirect: "/",
  failureFlash: true
}),
(req, res) => {
    
    const users = req.user;
    
    res.cookie('users', users, { maxAge: 24 * 60 * 60 * 1000});
    res.redirect('/dashboard');
  }
);

export default router;