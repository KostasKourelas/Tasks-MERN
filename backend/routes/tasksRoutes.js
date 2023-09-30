import express from 'express'
import {Task} from '../models/taskModel.js'

const router = express.Router()

//CREATE
router.post('/', async (req, res) => {
    try {
        if (
            !req.body.subject ||
            !req.body.description ||
            !req.body.status ||
            !req.body.priority
        ) {
            return res.status(400).send({
                message: 'Send all required fields'
            })
        }
        const newTask = {
            subject: req.body.subject,
            description: req.body.description,
            status: req.body.status,
            priority: req.body.priority,
        }

        const task = await Task.create(newTask)
        return res.status(201).send(task)
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message: error.message})
    }
})

//GET ALL
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find({})

        return res.status(200).json(tasks)
    }catch(error) {
        console.log(error.message)
        res.status(500).send({message: error.message})
    }
})

//GET ONE
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const task = await Task.findById(id)

        return res.status(200).json(task)
    }catch(error) {
        console.log(error.message)
        res.status(500).send({message: error.message})
    }
})


//UPDATE PUT
router.put('/:id', async (req, res) => {
    try {
        if (
            !req.body.subject ||
            !req.body.description ||
            !req.body.status ||
            !req.body.priority
        ){
            return res.status(400).send({
                message: 'Send all required fields'
            })
        }

        const { id } = req.params
        const result = await Task.findByIdAndUpdate(id, req.body)

        if (!result) {
            return res.status(404).json({message: 'Task not found'})
        }

        return res.status(200).send({message: 'Task updated successfully'})
    }catch(error) {
        console.log(error.message)
        res.status(500).send({message: error.message})
    }
})

//UPDATE PATCH
router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const result = await Task.findByIdAndUpdate(id, req.body)

        if (!result) {
            return res.status(404).json({message: 'Task not found'})
        }

        return res.status(200).send({message: 'Task updated successfully'})
    }catch(error) {
        console.log(error.message)
        res.status(500).send({message: error.message})
    }
})

//DELETE
router.delete('/:id', async (req, res) => {
    try{
        const { id } = req.params
        const result = await Task.findByIdAndDelete(id)
        if (!result) {
            return res.status(404).json({message: 'Task not found'})
        }

        return res.status(200).send({message: 'Task deleted successfully'})

    }catch(error) {
        console.log(error.message)
        res.status(500).send({message: error.message})
    }
})

export default router