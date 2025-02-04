import history from 'connect-history-api-fallback';
import Router from 'express-promise-router';
import serveStatic from 'express-static-gzip';

import { CLIENT_DIST_PATH, PUBLIC_PATH, UPLOAD_PATH } from '../paths';

const router = Router();

// SPA 対応のため、ファイルが存在しないときに index.html を返す
router.use(history());

router.use(
  serveStatic(UPLOAD_PATH, {
    enableBrotli: true,
    serveStatic: {
      etag: true,
      lastModified: true,
      maxAge: 604800 * 1000,
      immutable: true,
    }
  }),
);

router.use(
  serveStatic(PUBLIC_PATH, {
    enableBrotli: true,
    serveStatic: {
      etag: true,
      lastModified: true,
      maxAge: 604800 * 1000,
      immutable: true,
    }
  }),
);

router.use(
  serveStatic(CLIENT_DIST_PATH, {
    enableBrotli: true,
    serveStatic: {
      etag: true,
      lastModified: true,
      maxAge: 604800 * 1000,
      immutable: true,
    }
  }),
);

export { router as staticRouter };
