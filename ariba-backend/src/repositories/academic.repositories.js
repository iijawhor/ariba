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
  console.log("Teachers role ...........", organization, userRole);
  const orgId = new mongoose.Types.ObjectId(organization._id || organization);

  return await User.find({ organization, userRole });
};
