import * as AnnoucementRepositories from "../repositories/announcement.repositories.js";
import ApiError from "../utils/ApiError.js";
export const getAnnouncement = async (req) => {
  const { organization } = req.user;
  if (!organization) {
    throw new ApiError("Organization not found!", 404);
  }
  return await AnnoucementRepositories.getAnnouncement(organization);
};
