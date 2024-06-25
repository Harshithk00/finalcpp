import express from 'express';
import { questionset1, questionset2, questionset1written, questionset2written } from '../questionset.js';
import db from '../db.js'; 
import cookieParser from 'cookie-parser'; 

const app = express();
app.use(cookieParser());

const router = express.Router();

function zeroPad(num) {
  return num.toString().padStart(3, "0");
}

router.get('/quiz', async (req, res) => {
  try {
    

    let currentUser = req.cookies.users.name
    let usn = req.cookies.users.usn
    let currentUserSlice3 = currentUser.slice(-3)
    let currentUserUse = zeroPad(currentUserSlice3)
    
    console.log(currentUser!=null)

    if (currentUser!=null) {
      const checkattempt = await db.query("SELECT attemptedquiz1 FROM users WHERE usn = $1", [usn]);
      if (checkattempt.rows[0].attemptedquiz1 == 1) {
        req.flash("errtext1", "Already attempted the test");
        res.redirect("/dashboard");
      } else {
        if (currentUserUse % 2 == 0) {
          res.render("question", { questions: questionset2 });
        } else {
          res.render("question", { questions: questionset1 });
        }
      }
    } else {
        res.send(currentUser)
      res.redirect('/');
    }
  } catch (e) {
    console.log(e);
    res.redirect("/");
  }
});

router.post('/quiz', async (req, res) => {
  try {
    let currentUser = req.cookies.users.name
    if (currentUser!=null) {
      const userAnswers = req.body;
      let score = 0;

      
      let currentUserSlice3 = currentUser.slice(-3);
      let currentUserUse = zeroPad(currentUserSlice3);
      let usn = req.cookies.users.usn

      if (currentUserUse % 2 == 0) {
        questionset2.forEach((question, index) => {
          const userAnswer = userAnswers[`question${index}`];
          if (userAnswer === question.answer) {
            score++;
          }
        });
      } else {
        questionset1.forEach((question, index) => {
          const userAnswer = userAnswers[`question${index}`];
          if (userAnswer == question.answer) {
            score++;
          }
        });
      }

      await db.query("UPDATE users SET attemptedquiz1 = 1 WHERE usn= $1;", [usn]);
      await db.query("UPDATE users SET correctanswer= $1 WHERE usn= $2;", [score, usn]);

      res.redirect('/quiz2');
    } else {
      res.redirect('/');
    }
  } catch (e) {
    console.log(e);
    res.redirect("/");
  }
});

router.get("/quiz2", async (req, res) => {
  try {
    
    let currentUser = req.cookies.users.name;
    
    if (currentUser!=null) {
        
    let usn = req.cookies.users.usn
    let currentUserSlice3 = currentUser.slice(-3);
    let currentUserUse = zeroPad(currentUserSlice3);
    const checkattempt2 = await db.query("SELECT attemptedquiz2 FROM users WHERE usn = $1", [usn]);
    
    console.log(checkattempt2)

      if (checkattempt2.rows[0].attemptedquiz2== 1) {
        req.flash("errtext1", "Already attempted the test");
        res.redirect("/dashboard");
      } else {
        if (currentUserUse % 2 == 0) {
          res.render("quiz2", { questions: questionset2written });
        } else {
          res.render("quiz2", { questions: questionset1written });
        }
      }
    } else {
      res.redirect("/");
    }
  } catch (e) {
    console.log(e);
    res.redirect("/");
  }
});

router.post('/quiz2', async (req, res) => {
  try {
    const currentUser = req.cookies.users.name;
    

    if (currentUser!=null) {
        const usn = req.cookies.users.usn 
      
      const answers = req.body.answers;

      questionset2written.forEach(async (question, index) => {
        const answer = answers[index];
        try {
          await db.query(`UPDATE users SET writtenAnswer${index + 1} = $1 WHERE usn = $2`, [answer, usn]);
        } catch (e) {
          res.send(e);
        }
      });

      res.render("thankyou");
      await db.query(`UPDATE users SET attemptedquiz2 = 1 WHERE usn = $1`, [usn]);
    } else {
      res.redirect('/');
    }
  } catch (e) {
    console.log(e);
    res.redirect("/");
  }
});

export default router;
