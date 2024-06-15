import express from 'express'
import {createLesson, getLessons, getOneLesson, deleteLesson, updateLesson} from '../controllers/lessonController.js'

import { requireAuth } from '../middleware/requireAuth.js'

// require auth for all lesson routes
const router = express.Router()

router.use(requireAuth)

router.get('/', getLessons)

router.get('/:id', getOneLesson)

router.post('/', createLesson)

router.delete('/:id', deleteLesson)

router.patch("/:id", updateLesson);

export default router