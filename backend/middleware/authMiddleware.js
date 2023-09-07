import AsyncHandler from "express-async-handler";
import client from "../config/stytch.js";


const protect = AsyncHandler(async (req, res, next) => {
  const sessionToken = req.cookies.sessionToken


  client.sessions.authenticate({session_token: sessionToken}).then((response) => {
    req.user = response.user;
    next();
  }).catch((error) => {
  console.log(error);
  });

});

export { protect };


// update to validate with stytch