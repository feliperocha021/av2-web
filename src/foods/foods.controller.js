const express = require('express');
const router = express.Router();
const Food = require('./foods.model');

// Listar todos os alimentos
router.get('/', async (req, res) => {
    try {
        const foods = await Food.find();
        res.json(foods);
    } catch (err) {
        res.status(500).json({ message: 'Alimentos não encontrados' });
    }
});

// Buscar um alimento específico
router.get('/:id', getFood, (req, res) => {
  if (res.food) {
      res.json(res.food);
  } else {
      res.status(404).json({ message: 'Alimento não encontrado' });
  }
});

// Criar um novo alimento
router.post('/', async (req, res) => {
    const food = new Food({
        name: req.body.name,
        category: req.body.category,
        quantity: req.body.quantity,
        expirationDate: req.body.expirationDate,
        price: req.body.price
    });

    try {
        const newFood = await food.save();
        res.status(201).json(newFood);
    } catch (err) {
        res.status(400).json({ message: 'Erro ao criar um novo alimento' });
    }
});

// Atualizar um alimento existente
router.put('/:id', getFood, async (req, res) => {
  if (res.food) {
      if (req.body.name != null) {
          res.food.name = req.body.name;
      }
      if (req.body.category != null) {
          res.food.category = req.body.category;
      }
      if (req.body.quantity != null) {
          res.food.quantity = req.body.quantity;
      }
      if (req.body.expirationDate != null) {
          res.food.expirationDate = req.body.expirationDate;
      }
      if (req.body.price != null) {
          res.food.price = req.body.price;
      }
      try {
          const updatedFood = await res.food.save();
          res.json(updatedFood);
      } catch (err) {
          res.status(400).json({ message: 'Erro ao atualizar esse alimento' });
      }
  } else {
      res.status(404).json({ message: 'Alimento não encontrado' });
  }
});

// Excluir um alimento
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
      const food = await Food.findByIdAndDelete(id);
      if (food == null) {
          return res.status(404).json({ message: 'Alimento não encontrado' });
      }
      res.json({ message: 'Deleted Food' });
  } catch (err) {
      res.status(500).json({ message: 'Erro ao excluir esse alimento' });
  }
});


// Obter um alimento por ID
async function getFood(req, res, next) {
    let food;
    try {
        food = await Food.findById(req.params.id);
        if (food == null) {
            return res.status(404).json({ message: 'Alimento não encontrado' });
        }
    } catch (err) {
        return res.status(500).json({ message: 'Alimento não encontrado' });
    }

    res.food = food;
    next();
}

module.exports = router;
