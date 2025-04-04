const express = require('express')
const router = express.Router()
const {
  addStudent,
  fetchStudentsRecord,
  fetchById,
  deleteStudent,
  updateStudentDetails,
} = require('../controllers/studentController')

router.post('/v1/students/addStudent', addStudent)
router.get('/v1/students/health', (req, res) => {
  res.status(200).json('it seems like healthy')
})

router.get('/v1/students/fetchStudents', fetchStudentsRecord)
router.get('/v1/students/fetchById/:id',fetchById)
router.put('/v1/students/updateStudent/:id',updateStudentDetails)
router.delete('/v1/students/deleteById/:id',deleteStudent)

module.exports = router
