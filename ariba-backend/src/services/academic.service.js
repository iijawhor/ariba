import { Grade } from "../models/academic/class.model.js";
import Subject from "../models/academic/subject.model.js";
import * as AcademicRepositories from "../repositories/academic.repositories.js";
import ApiError from "../utils/ApiError.js";
export const createClass = async (req) => {
  const { className, section, capacity } = req.body;

  if (!className) {
    throw new ApiError("Please enter required fields!", 404);
  }
  const gradeExist = await Grade.findOne({ className });
  if (gradeExist) {
    throw new ApiError("Grade already exist", 400);
  }

  return await AcademicRepositories.createClass({
    className,
    section,
    capacity
  });
};
export const createSubject = async (req) => {
  const { subjectName, subjectCode } = req.body;
  if (!subjectName) {
    throw new ApiError("Please Provide subject name", 400);
  }
  const subjectExist = await Subject.findOne({ subjectName });
  if (subjectExist) {
    throw new ApiError("Subject already exist", 400);
  }
  return await AcademicRepositories.createSubejct({ subjectName, subjectCode });
};
