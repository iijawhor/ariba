import { Grade } from "../models/academic/grade.model.js";
import Routine from "../models/academic/routine.model.js";
import { Subject } from "../models/academic/subject.model.js";
import { User } from "../models/user.model.js";
import mongoose from "mongoose";
export const createClass = async ({
  className,
  section,
  capacity,
  organization
}) => {
  return await Grade.create({
    className,
    sections: [{ sectionName: section, capacity: capacity }],
    organization
  });
};
export const createSubejct = async ({
  subjectName,
  subjectCode,
  organization
}) => {
  return await Subject.create({ subjectName, subjectCode, organization });
};
export const createRoutine = async ({
  grade,
  subjectName,
  teachers,
  day,
  date,
  startTime,
  organization,
  endTime
}) => {
  return await Routine.create({
    grade,
    subjectName,
    teachers,
    day,
    date,
    startTime,
    endTime,
    organization
  });
};

export const getTeachers = async ({ userRole, organization }) => {
  return await User.find({ organization, userRole });
};
export const getStudents = async ({ userRole, organization }) => {
  return await User.find({ organization, userRole });
};
export const getGrades = async ({ organization }) => {
  return await Grade.find({ organization });
};
export const getSubjects = async ({ organization }) => {
  return await Subject.find({ organization });
};
export const getRoutine = async ({ day, date, grade, teacher }) => {
  const match = {};

  if (day) match.day = day;
  if (grade) match.grade = new mongoose.Types.ObjectId(grade);
  if (teacher) match.teachers = { $in: [new mongoose.Types.ObjectId(teacher)] };

  const pipeline = [
    { $match: match },

    // Lookup grade
    {
      $lookup: {
        from: "grades",
        localField: "grade",
        foreignField: "_id",
        as: "gradeDetails"
      }
    },
    { $unwind: "$gradeDetails" },

    // Lookup subject
    {
      $lookup: {
        from: "subjects",
        localField: "subjectName",
        foreignField: "_id",
        as: "subjectDetails"
      }
    },
    { $unwind: "$subjectDetails" },

    // Lookup teachers
    {
      $lookup: {
        from: "users",
        localField: "teachers",
        foreignField: "_id",
        as: "teacherDetails"
      }
    },

    // Project only required fields
    {
      $project: {
        _id: 1,
        day: 1,
        date: 1,
        startTime: 1,
        endTime: 1,
        grade: {
          _id: "$gradeDetails._id",
          className: "$gradeDetails.className",
          sections: "$gradeDetails.sections"
        },
        subject: {
          _id: "$subjectDetails._id",
          subjectName: "$subjectDetails.subjectName",
          subjectCode: "$subjectDetails.subjectCode"
        },
        teachers: {
          $map: {
            input: "$teacherDetails",
            as: "t",
            in: {
              teacherID: "$$t._id",
              firstName: "$$t.firstName",
              lastName: "$$t.lastName",
              email: "$$t.email"
            }
          }
        }
      }
    }
  ];

  return await Routine.aggregate(pipeline);
};
