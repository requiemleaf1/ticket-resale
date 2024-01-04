//route handler to get the current user
import express from 'express';
import { currentUser } from "@requiemleaftickets/common";

const router = express.Router();

router.get('/api/users/currentuser', currentUser,(req, res) => {//first try get payload and set it to req.currentUser if req.currentUser is undefine meaning the user isn't logged in, throw an error
  res.send({ currentUser: req.currentUser || null });// so it will send back null(instead of undefined) if req.currentUser is undefined(user not logged)
});

export { router as currentUserRouter };