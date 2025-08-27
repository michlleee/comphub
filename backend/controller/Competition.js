import Competition from "../models/Competition.js";
import slugify from "slugify";

export const addCompetition = async (req, res) => {
  try {
    const {
      title,
      shortDesc,
      description,
      category,
      topic,
      registrationOpen,
      registrationClose,
      eventDate,
      registrationLink,
      organizer,
      prize,
      location,
    } = req.body;

    const creatorId = req.user._id;
    const slug = slugify(title, { lower: true, strict: true });

    const newComp = new Competition({
      title,
      slug,
      shortDesc,
      description,
      category,
      topic,
      registrationOpen,
      registrationClose,
      eventDate,
      registrationLink,
      organizer,
      prize,
      location,
      createdBy: creatorId,
    });

    await newComp.save();

    res.status(201).json({
      message: "Competition successfully created",
      competition: newComp,
    });
  } catch (error) {
    console.error("Error adding new competition:", error);
    res.status(500).json({ message: "Failed to create new competition" });
  }
};

export const getAllCompetitions = async (req, res) => {
  try {
    const competitions = await Competition.find();
    res.status(200).json({
      message: "Successfully get all competition",
      competitionList: competitions,
    });
  } catch (error) {
    console.log("error in retrieving all competitions: ", error);
    res.status(500).json({ message: error.message });
  }
};

export const getSingleCompetition = async (req, res) => {
  try {
    const { slug } = req.params;
    const foundComp = await Competition.findOne({ slug: slug });

    if (!foundComp) {
      return res.status(404).json({ message: "Competition not found" });
    }

    res
      .status(200)
      .json({ message: "Competition found", competition: foundComp });
  } catch (error) {
    console.log("error ini getting competition by slug: ", error);
    res.status(500).json({ message: "error in fetching competition" });
  }
};

export const getSpecificCompetitions = async (req, res) => {
  try {
    const organizerId = req.user._id;
    const competitions = await Competition.find({ createdBy: organizerId });

    return res.status(200).json({
      message: "Competitions retrieved successfully",
      competitionList: competitions,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error while fetching competitions",
      error: error.message,
    });
  }
};

export const deleteCompetition = async (req, res) => {
  try {
    const { slug } = req.params;
    const result = await Competition.deleteOne({ slug });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Competition not found" });
    }

    res.status(200).json({ message: "deletion successful" });
  } catch (error) {
    console.log("error in deleteing competition: ", error);
    res.status(500).json({ message: "error in deleteing competition" });
  }
};

export const editCompetition = async (req, res) => {
  try {
    const { slug } = req.params;
    const updates = req.body;

    const updatedComp = await Competition.findOneAndUpdate(
      { slug },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedComp)
      return res.status(404).json({ message: "Competition not found" });

    res.status(200).json({
      message: "Competition updated successfully",
      competition: updatedComp,
    });
  } catch (error) {
    console.log("error in edit competition: ", error);
    res.status(500).json({ message: "error in editing competition" });
  }
};

export const searchCompetition = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || query.trim() === "") {
      return res.status(400).json({ message: "Query is required" });
    }

    const competitions = await Competition.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    });

    res.status(200).json({ competitionList: competitions });
  } catch (error) {
    console.error("searchCompetition error:", error);
    res.status(500).json({ message: error.message });
  }
};
