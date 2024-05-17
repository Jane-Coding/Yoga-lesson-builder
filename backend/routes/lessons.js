import express from 'express'
import {createLesson, getLessons, getOneLesson, deleteLesson, updateLesson} from '../controllers/lessonController.js'

const router = express.Router()

router.get('/', getLessons)

router.get('/:id', getOneLesson)

router.post('/', createLesson)

router.delete('/:id', deleteLesson)

router.patch("/:id", updateLesson);

export default router