import { Grade } from "../models/academic/class.model.js";
import Routine from "../models/academic/routine.model.js";
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

export const createRoutine = async (req) => {
  const { grade, subjectName, teachers, day, date, startTime, endTime } =
    req.body;
  const requiredFields = [
    "grade",
    "subjectName",
    "teachers",
    "day",
    "date",
    "startTime",
    "endTime"
  ];

  for (let field of requiredFields) {
    if (
      !req.body[field] ||
      (field === "teachers" && req.body[field].length === 0)
    ) {
      throw new ApiError(`Field ${field} is required`, 400);
    }
  }
  const routineExist = await Routine.findOne({
    grade, // same grade/class
    subjectName, // same subject
    day, // same day
    startTime: { $lt: endTime }, // existing start < new end
    endTime: { $gt: startTime } // existing end > new start
  });

  if (routineExist) {
    throw new ApiError(
      "A routine already exists for this subject in this class during this time",
      400
    );
  }

  const teacherConflict = await Routine.findOne({
    day, // same day
    teachers: { $in: teachers }, // any teacher in the array is already assigned
    startTime: { $lt: endTime }, // existing start < new end
    endTime: { $gt: startTime } // existing end > new start
  });

  if (teacherConflict) {
    // Identify which teachers are conflicting (optional)
    const conflictedTeachers = teacherConflict.teachers.filter((t) =>
      teachers.includes(t.toString())
    );

    throw new ApiError(
      `Schedule conflict: the following teacher(s) are already booked: ${conflictedTeachers.join(
        ", "
      )}`,
      400
    );
  }

  return await AcademicRepositories.createRoutine({
    grade,
    subjectName,
    teachers,
    day,
    date,
    startTime,
    endTime
  });
};
