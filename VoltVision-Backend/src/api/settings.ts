import { Router } from 'express';
import { getSystemSettings, updateSystemSettings } from '../application/settings';
import { authenticationMiddleware } from './middlewares/authentication-middleware';
import { authorizationMiddleware } from './middlewares/authorization-middleware';

const router = Router();

// 🔒 Protected: Only Admins can view or change system settings
router.get('/', authenticationMiddleware, authorizationMiddleware, getSystemSettings);
router.put('/', authenticationMiddleware, authorizationMiddleware, updateSystemSettings);

export default router;