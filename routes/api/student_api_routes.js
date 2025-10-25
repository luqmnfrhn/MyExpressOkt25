const express = require('express');
const router = express.Router();
const database = require('../../database');

// Get all students (API)
router.get('/', async (req, res) => {
    try{
        const [rows] = await database.query(
            'SELECT * FROM users')
            res.json({
                success:true,
                message: 'Students retrieved successfully',
                data: rows
            });
    } catch(error){
        console.error('Error retrieving students:', error.message);
        res.status(500).json({
            success:false,
            message: 'Students retrieval failed',
            error: error.message
        });
    }
});

// Get student by ID (API)
router.get('/:id', async (req, res) => {
    try{
        const [rows] = await database.query(
            'SELECT * FROM users WHERE id = ?', [req.params.id]
        );

        // Error handling for student not found
        if(rows.length === 0){
            return res.status(404).json({
                success:false,
                message:'Student not found'
            });
        }
        //success response
        res.json({
            success: true,
            message: 'Student details retrieved successfully',
            data: rows[0]
        })
    } catch (err){
        console.error(err);
        res.status(500).json({
            success:false,
            message: 'Failed to retrieve student details',
            error:err.message
        })
    }
})

module.exports = router;