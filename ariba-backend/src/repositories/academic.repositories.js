import { Grade } from "../models/academic/class.model.js";
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
