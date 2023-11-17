import Cors from 'cors';

// Initialize middleware
export default function initMiddleware(middleware) {
  return (req, res) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
}

// Usage example:
// const corsMiddleware = initMiddleware(
//   Cors({
//     origin: '*',
//     methods: ['POST'],
//     allowedHeaders: ['Content-Type'],
//   })
// );
