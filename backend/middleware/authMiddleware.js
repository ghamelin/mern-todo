import cookieParser, { JSONCookie } from "cookie-parser";
import AsyncHandler from "express-async-handler";
import * as stytch from 'stytch';


const protect = AsyncHandler(async (req, res, next) => {
  const sessionToken = JSONCookie(req.cookies.sessionToken).session_token;

  console.log(sessionToken);
  client.sessions.authenticate({session_token: sessionToken}).then((response) => {
    req.user = response;
    next();
  }).catch((error) => {
  console.log(error);
  });

});

export { protect };


// update to validate with stytch