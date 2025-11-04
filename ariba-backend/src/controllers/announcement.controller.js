import * as AnnouncementService from "../services/announcement.service.js";
export const getAnnouncement = async (req, res) => {
  try {
    const announcement = await AnnouncementService.getAnnouncement(req);
    return res
      .status(200)
      .json({ message: "Announcements fetched successfully", announcement });
  } catch (error) {
    return res.status(400).json({
      message: error?.response?.message || "Failed to get announcement!"
    });
  }
};
