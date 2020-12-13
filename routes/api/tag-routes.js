const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");
const { increment } = require("../../models/Tag");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  try {
    // find all tags
    const tagData = await Tag.findAll({
      // be sure to include its associated Product data
      include: [{ model: Product }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    // find a single tag by its `id`
    const tagData = await Tag.findByPk(req.params.id, {
      // be sure to include its associated Product data
      include: [{ model: Product }],
    });

    // Check to see if tag was returned
    if (!tagData) {
      res
        .status(404)
        .json({ message: "There are no tags under the provided id." });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    // create a new tag with the tag_name from req.body
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    // update a tag's name by its `id` value
    const tagData = await Tag.update(
      {
        // Update tag_name
        tag_name: req.body.tag_name,
      },
      {
        // Return updated tag
        returning: true,
        where: {
          id: req.params.id,
        },
      }
    );

    // Check to see if tag was updated
    if (!tagData) {
      res
        .status(404)
        .json({ message: "Tag id not found. No update was made." });
        return
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
  // delete on tag by its `id` value
  const tagData = await Tag.destroy({
    where: {
      id: req.params.id
    }
  });
  // Check to see if tag was deleted 
  if(!tagData){
    res.status(404).json({message:"Tag id not found. Nothing was deleted."})
    return
  }
  res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
