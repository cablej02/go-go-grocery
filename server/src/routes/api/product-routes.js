import { Op, col, fn, literal } from 'sequelize';
import express from 'express';
import { Product } from '../../models/index.js';
import { Category } from '../../models/index.js';
import { GroceryListItem } from '../../models/index.js';

const router = express.Router();

// GET /products/suggested - Get suggested products
router.get('/suggested', async (req, res) => {
    const { excludedProductIds = [], limit = 5 } = req.query;

    // parse the query parameters
    if(typeof excludedProductIds === 'string') {
        try{
            excludedProductIds = JSON.parse(excludedProductIds);
        } catch (error) {
            return res.status(400).json({ message: 'excludedProductIds must be a valid JSON array' });
        }
    }

    // validate the query parameters
    if(!Array.isArray(excludedProductIds) || excludedProductIds.some(id => isNaN(Number(id)))) {
        return res.status(400).json({ message: 'excludedProductIds must be an array of numbers' });
    }

    if(isNaN(Number(limit))) {
        return res.status(400).json({ message: 'limit must be a number' });
    }

    // limit the number of suggested items to 10 and ensure it is greater than 0
    if(limit < 1) {
        return res.status(400).json({ message: 'limit must be greater than 0' });
    } else if (limit > 10) {
        limit = 10;
    }

    try {
        const suggestedItems = await GroceryListItem.findAll({
            logging: console.log,
            attributes: [
                'product_id',
                [fn('COUNT', col('product_id')), 'product_count'],
            ],
            include: [
                {
                    model: Product,
                    attributes: ['name', 'category_id'], // exclude all product attributes except those in the parent attributes array
                    include: [
                        {
                            model: Category,
                            attributes: ['name'],
                        },
                    ],
                },
            ],
            where: {
                createdAt: {
                    [Op.gte]: literal("CURRENT_DATE - INTERVAL '30 DAYS'"),
                },
                product_id: {
                    [Op.notIn]: excludedProductIds,
                },
            },
            group: ['product_id', 'Product.id', 'Product.name', 'Product.Category.id', 'Product.category_id','Product.Category.name'],
            order: [[fn('COUNT', col('product_id')), 'DESC']],
            limit: Number(limit),
        });

        res.json(suggestedItems.map(item => ({
            product_id: item.product_id,
            name: item.Product.name,
            category_id: item.Product.category_id,
            categoryName: item.Product.Category.name,
        })));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET /products/:id - Get a product by id
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByPk(id);
        if (product) {
            res.json(product)
        } else {
            res.status(404).json({message: 'Product not found'});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// GET /products - Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.findAll(
            {include: {model:Category}}
        );
        if (products.length>0){
            res.json(products.map(product => {
                return {
                    id: product.id, 
                    name: product.name,
                    category_id: product.category_id,
                    categoryName: product.Category.name,
                }
            }))
        } else {
            res.status(404).json({message: 'Products not found'});
        }
    } catch (error) {
        res.status(500).json({message: error.message});

    }
});

// POST /products - Create a new product
router.post('/', async (req, res) => {
    const {name, category_id} = req.body
    try {
        const product = await Product.create({
            name, category_id
        });
        res.status(201).json(product)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
});

// PUT /products/:id - Update a product by id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, category_id } = req.body;

  // validate the request and confirm category_id is a number
  if (!name || !category_id || isNaN(Number(category_id))) {
      return res.status(400).json({message: 'Name and category_id are required'});
  }

  try {
      const product = await Product.findByPk(id);
      if (product) {
          product.name = name;
          product.category_id = category_id;
          await product.save();
          res.json(product);
      } else {
          res.status(404).json({message: 'Product not found'});
      }
  } catch (error) {
      res.status(500).json({message: error.message});
  }
});

// PATCH /products/:id - Update a product by id
router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, category_id } = req.body;
    try {
        const product = await Product.findByPk(id);
        if (product) {
            if (name) product.name = name;
            if (category_id) product.category_id = category_id;
            await product.save();
            res.json(product);
        } else {
            res.status(404).json({message: 'Product not found'});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// DELETE /products/:id - Delete a product by id
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByPk(id);
        if (product) {
            await product.destroy();
            res.json({message: 'Product deleted'});
        } else {
            res.status(404).json({message: 'Product not found'});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

export { router as productRouter }