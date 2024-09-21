import { Router } from 'express';
import { AppDataSource } from '../DataSource';
import { Review } from '../entity/Review';
import { authenticateJWT } from '../middleware/authMiddleware';

const router = Router();

router.use(authenticateJWT);

// Criar uma nova crítica
router.post('/', async (req, res) => {
  const { albumName, artist, year, review, rating } = req.body;

  if (!albumName || !artist || !year || !review || !rating) {
    return res.status(400).json({
      error: {
        status: 400,
        name: 'Validation error',
        message: 'All fields are required'
      }
    });
  }

  const reviewRepository = AppDataSource.getRepository(Review);
  const newReview = reviewRepository.create({
    albumName,
    artist,
    year,
    review,
    rating, // Inclui a avaliação
  });

  await reviewRepository.save(newReview);
  res.status(201).json({
    data: newReview
  });
});

// Buscar todas as críticas
router.get('/', async (req, res) => {
  const reviewRepository = AppDataSource.getRepository(Review);
  const reviews = await reviewRepository.find();
  res.json({
    data: reviews
  });
});

// Deletar uma crítica
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const reviewRepository = AppDataSource.getRepository(Review);

  try {
    const review = await reviewRepository.findOneBy({ id: Number(id) });
    if (!review) {
      return res.status(404).json({
        error: {
          status: 404,
          name: 'Not Found',
          message: 'Review not found'
        }
      });
    }

    await reviewRepository.remove(review);
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({
      error: {
        status: 500,
        name: 'Internal Server Error',
        message: 'Failed to delete review'
      }
    });
  }
});

export default router;
