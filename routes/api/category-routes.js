const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint
router.get("/", async (req, res) => {
  // find all categories
  try {
    //make request to get all categories and join Product data
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  try {
    //request a single catefory by id and join product info
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    // Check to see if a category was returned
    if (!categoryData) {
      res
        .status(404)
        .json({ message: "There are no categories under the provided id." });
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // Create new category
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
    return;
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update(
      {
        // Update category name
        category_name: req.body.category_name,
      },
      {
        // Return updated category
        returning: true,
        where: {
          id: req.params.id,
        },
      }
    );
    // Check to see if a category was updated
    if (!categoryData) {
      res
        .status("404")
        .json({ message: "Category id not found. No update was made." });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    // Check to see if category was found and delted
    if(!categoryData){
      res.status(404).json({message: "Category id not found. Nothing was deleted."})
      return
    }

    res.status(200).json(categoryData)
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
