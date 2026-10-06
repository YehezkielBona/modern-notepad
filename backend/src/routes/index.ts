import { Router } from 'express';

const router = Router();

// Placeholder routes to be expanded in Sprint 2 & 3
router.get('/', (_req, res) => {
  res.json({
    message: 'Modern Notepad API v1',
    endpoints: {
      auth: '/api/auth',
      notes: '/api/notes',
      todos: '/api/todos',
      users: '/api/users',
    },
  });
});

export default router;
