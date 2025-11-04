import { Announcement } from "../models/announcement.model.js";
export const getAnnouncement = async (organization) => {
  return await Announcement.find({ organization: organization }).sort({
    createdAt: -1
  });
};
