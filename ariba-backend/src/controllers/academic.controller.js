import * as AcademicServices from "../services/academic.service.js";
export const createClass = async (req, res) => {
  try {
    const newClass = await AcademicServices.createClass(req);
    return res
      .status(200)
      .json({ message: "Class created successfully", newClass });
  } catch (error) {
    return res.status(400).json({ message: "Failed to create class" });
  }
};
export const createSubject = async (req, res) => {
  try {
    const newSubject = await AcademicServices.createSubject(req);
    return res
      .status(200)
      .json({ mesage: "Subject created successfully", newSubject });
  } catch (error) {
    return res.status(400).json({ message: "Failed to create subject" });
  }
};

export const createRoutine = async (req, res) => {
  try {
    const newRoutine = await AcademicServices.createRoutine(req);
    return res
      .status(200)
      .json({ message: "Routine created successfully", newRoutine });
  } catch (error) {
    return res.status(400).json({ message: "Failed to create routine" });
  }
};
export const getTeachers = async (req, res) => {
  try {
    const teachers = await AcademicServices.getTeachers(req);
    return res
      .status(200)
      .json({ message: "Teacher fetched successfully", teachers });
  } catch (error) {
    return res
      .status(400)
      .json({ message: error?.response?.message || "Failed to get teachers!" });
  }
};
export const getStudents = async (req, res) => {
  try {
    const students = await AcademicServices.getStudents(req);
    return res
      .status(200)
      .json({ message: "Students fetched successfully", students });
  } catch (error) {
    return res
      .status(400)
      .json({ message: error?.response?.message || "Failed to get students!" });
  }
};
export const getGrades = async (req, res) => {
  try {
    const grades = await AcademicServices.getGrades(req);
    return res
      .status(200)
      .json({ message: "Grades fetched successfully", grades });
  } catch (error) {
    return res
      .status(400)
      .json({ message: error?.response?.message || "Failed to get grades!" });
  }
};
export const getSubjects = async (req, res) => {
  try {
    const subjects = await AcademicServices.getSubjects(req);
    return res
      .status(200)
      .json({ message: "Subjects fetched successfully", subjects });
  } catch (error) {
    return res
      .status(400)
      .json({ message: error?.response?.message || "Failed to get subjects!" });
  }
};

export const getRoutine = async (req, res) => {
  try {
    const response = await AcademicServices.getRoutine(req);
    return res.status(200).json({
      success: true,
      message: "Routine fetched successfully",
      data: response
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Failed to fetch routine!"
    });
  }
};
