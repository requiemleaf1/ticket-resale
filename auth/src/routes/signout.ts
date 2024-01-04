import express from 'express';

const router = express.Router();

router.post('/api/users/signout', (req, res) => {
  req.session = null;// destroy a cookiesession from the client so the following request from this client won't have a cookie session

  res.send({});
});

export { router as signoutRouter };
