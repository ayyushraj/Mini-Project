import express from 'express';
import { loginRoute, signupRoute, getUserDetailsRoute} from '../controllers/AuthController.js';

const router = express.Router()

router.post('/login', loginRoute)
router.post('/signup', signupRoute)
router.get('/getUserDetails', getUserDetailsRoute)

export default router