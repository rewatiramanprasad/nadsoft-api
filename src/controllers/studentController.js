const { Prisma } = require('@prisma/client')
const prisma = require('../utils/db')
const { response } = require('../utils/responseStructure')

const checkHealth = (req, res) => {
  res.status(200).json('it seems like healthy')
}

const addStudent = async (req, res, next) => {
  const { name, email, age, math, science, english } = req.body
  const studentData = { name, email, age }
  const markData = { math, science, english }

  try {
    console.log(studentData, markData)
    const studentResponse = await prisma.student.create({ data: studentData })
    const markResponse = await prisma.mark.create({
      data: { ...markData, studentId: studentResponse.id },
    })
    console.log(markResponse)
    res.status(201).send(response([], true, 'Student added successfully')).end()
  } catch (error) {
    next(error)
  }
}

const fetchStudentsRecord = async (req, res, next) => {
  try {
    const limit = Number(req.query.limit || 10)
    const page = Number(req.query.page || 1)
    const skip = (page - 1) * limit
    const data = await prisma.student.findMany({
      skip: skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    })
    const count = await prisma.student.count({})
    const totalPages = Math.ceil(count / limit)
     const mapping=[{ students: data, count: count, page, totalPages: totalPages }]
    const result = response(mapping, true, `${data.length} rows fetched`)
    res.status(200).send(result).end()
  } catch (error) {
    next(error)
  }
}

const fetchById = async (req, res, next) => {
  const id = Number(req.params.id)
  console.log(id)

  try {
    const studentResponse = await prisma.student.findFirst({
      where: { id: id },
    })
    console.log(studentResponse)

    const marksResponse = await prisma.mark.findFirst({
      where: { studentId: id },
    })
    let mergedData = []
    if (marksResponse) {
      mergedData = [
        {
          ...studentResponse,
          math: marksResponse.math,
          science: marksResponse.science,
          english: marksResponse.english,
        },
      ]
    } else if (studentResponse === null) {
      mergedData = []
    } else {
      mergedData = [studentResponse]
    }

    res.status(200).send(response(mergedData, true)).end()
  } catch (error) {
    next(error)
  }
}

const deleteStudent = async (req, res, next) => {
  const id = Number(req.params.id)
  try {
    await prisma.student.delete({
      where: { id: id },
    })
    res.status(200).send(response([], true, ' Deleted successfully'))
  } catch (error) {
    next(error)
  }
}

const updateStudentDetails = async (req, res, next) => {
  const id = Number(req.params.id)
  const { name, email, age, math, science, english } = req.body
  try {
    await prisma.student.update({
      where: { id: id },
      data: { name, email, age },
    })
    const markId = await prisma.mark.findFirst({ where: { studentId: id } })
    await prisma.mark.update({
      where: { id: markId.id },
      data: {
        math,
        science,
        english,
      },
    })
    res.status(200).send(response([], true, 'Student updated successfully'))
  } catch (error) {
    next(error)
  }
}

module.exports = {
  checkHealth,
  addStudent,
  fetchStudentsRecord,
  fetchById,
  deleteStudent,
  updateStudentDetails,
}
