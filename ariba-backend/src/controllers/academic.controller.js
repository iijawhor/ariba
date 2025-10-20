import * as AcademicServices from "../services/academic.service.js";
export const createClass = async (req, res) => {
  try {
    const newClass = await AcademicServices.createClass(req);
    return res
      .status(200)
      .json({ message: "Class created successfully", newClass });
  } catch (error) {
    return res.status(400).json({ message: "Failed tio create class" });
  }
};
