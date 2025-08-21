import Competition from "../models/Competition.js";
import slugify from "slugify";

export const addCompetition = async (req, res) => {
  try {
    const { title, description, category, deadline, registrationLink } =
      req.body;

    const adminId = req.user._id;
    const slug = slugify(title, { lower: true, strict: true });
    const newComp = new Competition({
      title,
      slug,
      description,
      category,
      deadline,
      registrationLink,
      createdBy: adminId,
    });

    await newComp.save();

    res.status(201).json({
      message: "competition successfully created",
      competition: newComp,
    });
  } catch (error) {
    console.log("error in adding new comp: ", error);
    res.status(500).json({ message: "error in created new Competition" });
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
