import { Grade } from "../models/academic/class.model.js";
import Routine from "../models/academic/routine.model.js";
import Subject from "../models/academic/subject.model.js";
export const createClass = async ({ className, section, capacity }) => {
  return await Grade.create({
    className,
    sections: [{ sectionName: section, capacity: capacity }]
  });
};
export const createSubejct = async ({ subjectName, subjectCode }) => {
  return await Subject.create({ subjectName, subjectCode });
};
export const createRoutine = async ({
  grade,
  subjectName,
  teachers,
  day,
  date,
  startTime,
  endTime
}) => {
  return await Routine.create({
    grade,
    subjectName,
    teachers,
    day,
    date,
    startTime,
    endTime
  });
};
