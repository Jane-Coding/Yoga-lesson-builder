import Lesson from '../models/lessonModel.js'
import mongoose from 'mongoose'

const getLessons = async (req, res) => {
    const user_id = req.user._id

    const lessons = await Lesson.find({ user_id }).sort({createdAt: -1})

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
    const {title, description, poses} = req.body
    
    let emptyFields = []

    if(!title){
        emptyFields.push('title')
    }
    if(!description){
        emptyFields.push('description')
    }
    if(poses.length === 0){
        emptyFields.push('poses')
    }

    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
    }
    
    try{
        const user_id = req.user._id
        const lesson = await Lesson.create({title, description, poses, user_id})
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
    const {title, description, poses} = req.body

    let emptyFields = []

    if(!title){
        emptyFields.push('title')
    }
    if(!description){
        emptyFields.push('description')
    }
    if(poses.length === 0){
        emptyFields.push('poses')
    }

    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
    }

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