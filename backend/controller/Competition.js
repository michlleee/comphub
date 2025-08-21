import Competition from "../models/Competition.js";

export const addCompetition = async (req, res) => {
  try {
    const { title, description, category, deadline, registrationLink } =
      req.body;

    const adminId = req.user._id;
    const newComp = new Competition({
      title,
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
