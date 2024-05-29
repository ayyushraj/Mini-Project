import express from 'express';
import {saveResponse, fetchUserResponses} from '../controllers/ResponseController.js';


const router = express.Router();

router.post('/saveResponse', saveResponse);
router.get('/getResponse/:userId', fetchUserResponses);

export default router;
