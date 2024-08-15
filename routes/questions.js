// // routes/questions.js
// import express from 'express';
// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';

// const router = express.Router();

// // Get the directory name of the current module file
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Helper function to load questions from all JSON files
// const loadQuestionsFromJSON = () => {
//   const questionsDir = path.join(__dirname, '../questions');
//   const files = fs.readdirSync(questionsDir);
//   let allQuestions = [];

//   files.forEach((file) => {
//     const filePath = path.join(questionsDir, file);
//     const fileContent = fs.readFileSync(filePath, 'utf8');
//     const questions = JSON.parse(fileContent);
//     allQuestions = allQuestions.concat(questions);
//   });

//   return allQuestions;
// };

// // Get all questions
// router.get('/', (req, res) => {
//   try {
//     const questions = loadQuestionsFromJSON();
//     res.json(questions);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Get a random question
// router.get('/random', (req, res) => {
//   try {
//     const questions = loadQuestionsFromJSON();
//     const randomIndex = Math.floor(Math.random() * questions.length);
//     res.json(questions[randomIndex]);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// export default router;


import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

// Get the directory name of the current module file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper function to load questions from all JSON files
const loadQuestionsFromJSON = () => {
  const questionsDir = path.join(__dirname, '../questions');
  const files = fs.readdirSync(questionsDir);
  let allQuestions = [];

  files.forEach((file) => {
    const filePath = path.join(questionsDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const questions = JSON.parse(fileContent);
    allQuestions = allQuestions.concat(questions);
  });

  return allQuestions;
};

// Shuffle array function
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

// Get 20 random questions
router.get('/random20', (req, res) => {
  try {
    let questions = loadQuestionsFromJSON();
    shuffleArray(questions);
    const randomQuestions = questions.slice(0, 20); // Get first 20 questions from the shuffled array
    const numberedQuestions = randomQuestions.map((question, index) => ({
      ...question,
      questionNumber: index + 1
    }));
    res.json(numberedQuestions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
