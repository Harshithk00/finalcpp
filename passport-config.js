import passport from 'passport';
import { Strategy } from 'passport-local';
import bcrypt from 'bcrypt';
import db from './db.js';
import cookieParser from 'cookie-parser'; 
import express from 'express';

const app = express();
app.use(cookieParser());

passport.use(
  'locallogin',
  new Strategy({ usernameField: "usn" }, async function verify(usn, password, cb) {
    try {
      const result = await db.query("SELECT * FROM users WHERE usn = $1 ", [usn]);
      if (result.rows.length > 0) {
        const user = result.rows[0];
        const users = result.rows[0];
        const storedHashedPassword = user.password;

        bcrypt.compare(password, storedHashedPassword, (err, valid) => {
          if (err) {
            console.error("Error comparing passwords:", err);
            return cb(err);
          } else {
            if (valid) {
                
                return cb(null, users);
              
            } else {
              return cb(null, false);
            }
          }
        });
      } else {
        return cb("User not found");
      }
    } catch (err) {
      console.error(err);
      return cb(err);
    }
  })
);

passport.use(
  'locallogin2',
  new Strategy({ usernameField: "usn" }, async function verify(usn, password, cb) {
    try {
      const result = await db.query("SELECT * FROM users WHERE usn = $1 ", [usn]);
      if (result.rows.length > 0) {
        const user = result.rows[0];
        
        
        const storedPassword = user.password;

        const correctPass = storedPassword == password;

        const correctPassB = await bcrypt.compare(password, storedPassword);

        if (correctPass || correctPassB) {
            return cb(null, user);
        } else {
          return cb(null, false);
        }
      } else {
        return cb("User not found");
      }
    } catch (err) {
      console.error(err);
      return cb(err);
    }
  })
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
}); 

export default passport;