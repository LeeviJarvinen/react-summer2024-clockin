import express from 'express';
import clockController from '../controllers/clockController.js';
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router();

router.post('/clockin', protect, clockController.clockIn)
router.post('/clockout', protect, clockController.clockOut)
router.post('/manual-clock', protect, clockController.clockManually)
router.get('/history', protect, clockController.getClockHistory)
router.get('/entry-user/:userId/hours-user/:entryId', protect, clockController.getClockEntry)

export default router