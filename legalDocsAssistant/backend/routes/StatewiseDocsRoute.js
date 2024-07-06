// Importing necessary modules and the controller
import express from 'express';
import { getQuestionsList } from '../controllers/StatewiseDocsController'; 

const router = express.Router();

router.get('/getquestions', getQuestionsList);

export default router;
