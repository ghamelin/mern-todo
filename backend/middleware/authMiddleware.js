import cookieParser, { JSONCookie } from "cookie-parser";
import AsyncHandler from "express-async-handler";
import client from "../config/stytch.js";


const protect = AsyncHandler(async (req, res, next) => {
  const sessionToken = JSON.parse(req.cookies.sessionToken)?.session_token;
  client.sessions.authenticate({session_token: sessionToken}).then((response) => {
    req.user = response.user;
    console.log('req.user:', req.user);
    next();
  }).catch((error) => {
  console.log(error);
  });

});

export { protect };


// update to validate with stytch