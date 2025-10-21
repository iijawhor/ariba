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

    return res.status(200).json({ message: "Failed to create routine" });
  }
};
