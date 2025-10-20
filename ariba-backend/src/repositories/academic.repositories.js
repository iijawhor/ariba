import { Grade } from "../models/academic/class.model.js";
export const createClass = async ({ className, section, capacity }) => {
  return await Grade.create({
    className,
    sections: [{ sectionName: section, capacity: capacity }]
  });
};
