import User from "../models/User.js";

export const getPendingOrganizers = async (req, res) => {
  try {
    const organizers = await User.find({
      role: "organizer",
      status: "pending",
    }).select("-password");

    return res.status(200).json({ organizers });
  } catch (error) {
    console.log("error fetching pending organizers:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const approveOrganizerStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await User.findByIdAndUpdate(
      id,
      { $set: { status: "verified" } },
      { new: true }
    ).select("-password");

    if (!result)
      return res.status(404).json({ message: "Organizer not found" });

    return res
      .status(200)
      .json({ message: "Organizer successfully verified", organizer: result });
  } catch (error) {
    console.log("error updating status organizers:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const rejectOrganizerStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await User.findByIdAndUpdate(
      id,
      { $set: { status: "rejected" } },
      { new: true }
    ).select("-password");

    if (!result)
      return res.status(404).json({ message: "Organizer not found" });

    return res
      .status(200)
      .json({ message: "Organizer application rejected", organizer: result });
  } catch (error) {
    console.log("error updating status organizers:", error);
    return res.status(500).json({ message: error.message });
  }
};
