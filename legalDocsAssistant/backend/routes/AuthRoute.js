import express from 'express';
import { loginRoute, signupRoute, getUserDetailsRoute, updateStateRoute} from '../controllers/AuthController.js';

const router = express.Router()

router.post('/login', loginRoute)
router.post('/signup', signupRoute)
router.get('/getUserDetails/:id', getUserDetailsRoute)
router.post('/updateState', updateStateRoute)

export default router