const express = require('express')
const router = express.Router()
const {
  isValidStudentDetails,
  isValidFetchDetails,
  isValidId,
  isValidUpdateDetails,
} = require('../utils/validation')
const {
  checkHealth,
  addStudent,
  fetchStudentsRecord,
  fetchById,
  deleteStudent,
  updateStudentDetails,
} = require('../controllers/studentController')

router.post('/v1/students/addStudent', isValidStudentDetails, addStudent)
router.get('/v1/students/health', checkHealth)
router.get(
  '/v1/students/fetchStudents',
  isValidFetchDetails,
  fetchStudentsRecord
)
router.get('/v1/students/fetchById/:id', isValidId, fetchById)
router.put(
  '/v1/students/updateStudent/:id',
  isValidUpdateDetails,
  updateStudentDetails
)
router.delete('/v1/students/deleteById/:id', isValidId, deleteStudent)

module.exports = router
