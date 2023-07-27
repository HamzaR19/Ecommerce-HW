const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products

  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryId = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!categoryId) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

  }
  catch (err) {
    res.status(500).json(err);
  }});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  }).then((category) => {
    res.json(category);
  });
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryId = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!categoryId) {
      res.status(404).json({ message: 'No category found with that id, oh no!' });
      return;
    }
    res.status(200).json(categoryId);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryId = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!categoryId) {
      res.status(404).json({ message: 'No category found with that id, oh no!' });
      return;
    }
    res.status(200).json(categoryId);


  }
  catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
