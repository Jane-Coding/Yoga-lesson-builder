import Lesson from '../models/lessonModel.js'
import mongoose from 'mongoose'

const getLessons = async (req, res) => {
    const lessons = await Lesson.find({}).sort({createdAt: -1})

    res.status(200).json(lessons)
}

const getOneLesson = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such lesson"})
    }

    const lesson = await Lesson.findById(id)

    if(!lesson) {
        return res.status(404).json({error: "No such lesson"})
    }

    res.status(200).json(lesson)
}

const createLesson = async (req, res) => {
    const {title, description} = req.body
    
    try{
        const lesson = await Lesson.create({title, description})
        res.status(200).json(lesson)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

const deleteLesson = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such lesson"})
    }

    const lesson = await Lesson.findByIdAndDelete({_id: id})

    if(!lesson) {
        return res.status(404).json({error: "No such lesson"})
    }

    res.status(200).json(lesson)
}

const updateLesson = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such lesson"})
    }

    const lesson = await Lesson.findOneAndUpdate({_id: id}, {...req.body})

    if(!lesson) {
        return res.status(404).json({error: "No such lesson"})
    }

    res.status(200).json(lesson)
}
export {createLesson, getLessons, getOneLesson, deleteLesson, updateLesson}