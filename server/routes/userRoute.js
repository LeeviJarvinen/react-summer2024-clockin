import express from 'express';
import userController from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router();

router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.put('/update/:id', protect, userController.updateUser)
router.get('/user/:id', protect, userController.getUser)
router.get('/role', protect, userController.getRole)
router.get('/all-users', protect, userController.getAllUsers)
router.delete('/delete/:id', protect, userController.deleteUser)

export default router