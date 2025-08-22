import User from "../models/User.js";
import Competition from "../models/Competition.js";

export const saveComp = async (req, res) => {
  try {
    const userId = req.user._id;
    if (!userId) return res.status(401).json({ message: "user not found" });

    const { slug } = req.params;
    if (!slug)
      return res.status(404).json({ message: "competition not found" });

    const exist = await Competition.findOne({ slug: slug });
    if (!exist)
      return res.status(404).json({ message: "competition does not exist" });

    const result = await User.findByIdAndUpdate(
      { _id: userId },
      { $addToSet: { savedCompetitions: exist._id } },
      { new: true }
    );

    res.status(200).json({
      message: "Successfully saved competition",
      updatedUser: {
        _id: result._id,
        username: result.username,
        role: result.role,
        savedCompetitions: result.savedCompetitions,
      },
    });
  } catch (error) {
    console.log("error in saving competition: ", error);
    res.status(500).json({ message: "error in saving competition" });
  }
};

export const removeSavedComp = async (req, res) => {
  try {
    const userId = req.user._id;
    if (!userId) return res.status(401).json({ message: "user not found" });

    const { slug } = req.params;
    if (!slug)
      return res.status(404).json({ message: "competition not found" });

    const exist = await Competition.findOne({ slug: slug });
    if (!exist)
      return res.status(404).json({ message: "competition does not exist" });

    const existInArray = await User.findOne({
      _id: userId,
      savedCompetitions: exist._id,
    });
    if (!existInArray)
      return res
        .status(400)
        .json({ message: "competition does not exist in saved collection" });

    const result = await User.findByIdAndUpdate(
      { _id: userId },
      { $pull: { savedCompetitions: exist._id } },
      { new: true }
    );

    res.status(200).json({
      message: "Successfully removed competition from saved collection",
      updatedUser: {
        _id: result._id,
        username: result.username,
        role: result.role,
        savedCompetitions: result.savedCompetitions,
      },
    });
  } catch (error) {
    console.log("error in removing saved competition: ", error);
    res.status(500).json({ message: "error in removing saved competition" });
  }
};

export const getAllSavedComp = async (req, res) => {
  try {
    const userId = req.user._id;
    if (!userId) return res.status(401).json({ message: "user not found" });

    const result = await User.findById(userId)
      .select("_id username savedCompetitions")
      .populate("savedCompetitions", "title slug deadline");

    if (!result) {
      return res.status(404).json({ message: "user not found in database" });
    }

    const { savedCompetitions, username, _id } = result;

    res.status(200).json({
      message: "Successfully retrived all saved competitions",
      id: _id,
      username: username,
      savedComp: savedCompetitions,
    });
  } catch (error) {
    console.log("error in retrieving saved competition: ", error);
    res.status(500).json({ message: "error in retrieving saved competition" });
  }
};
