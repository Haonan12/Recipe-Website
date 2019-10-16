import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

import { Strategy as LocalStrategy } from "passport-local";

import { secretOrKey } from "../config/jwt";

import { ROLE_USER_MANAGER, ROLE_TEMPLATE_MANAGER, ROLE_DATA_MANAGER, ROLE_ORGANIZATION_MANAGER, ROLE_PACKAGE_MANAGER } from "../constants/roles";

import { ERROR_AUTH_FAIL, ERROR_DATABASE, HTTP_ERROR_AUTH_FAIL, HTTP_ERROR_DATABASE, HTTP_ERROR_UNAUTHORIZED } from "../constants/rest";
import { PASSPORT_JWT, PASSPORT_LOGIN, PASSPORT_REGISTER } from "../constants/passport"

/**
 * User passport authentication.
 * 
 * This checks for the user's username in the token
 */
const userAuthentication = ({ passport, UserModel }) => {
  passport.use(PASSPORT_JWT, new JwtStrategy({ jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey, session: false }, (payload, done) => {
    UserModel.findOne({ username: payload.id })
      .then((user) => done(null, user ? user : false))
      .catch((error) => done(error, false));
    })
  );
};

const loginAuthentication = ({ passport, UserModel }) => {
  passport.use(PASSPORT_LOGIN, new LocalStrategy({ session: false }, async (username, password, done) => {
    UserModel.authenticate()(username, password, (error, result) => {
      if(error) {
        done(error);
      } else {
        result ? done(null, result) : done(null, false, { message: "Unable to login user" });
      }
    })
  }));
};

/**
 * Passport authentication for Register. Receives a username, password, name, and email from the user's request.
 * 
 * Checks the database for existing `username` and `email`. Usernames and emails must be unique.
 */
const registerAuthentication = ({ passport, UserModel }) => {
  passport.use(PASSPORT_REGISTER, new LocalStrategy({ passReqToCallback: true, session: false }, (req, username, password, done) => {
    const { email, firstName, lastName, phoneNumber } = req.body;
    UserModel.register({ username, email, firstName, lastName, phoneNumber }, password, (error, result) => {
      if(error) {
        done(error);
      } else {
        result ? done(null, result) : done(null, false, { message: "Unable to register user" });
      }
    })
  }));
};

/**
 * Authentication middleware which checks for valid tokens
 */
export const userAuthenticationMiddleware = ({ passport }) => (req, res, next) => {
  passport.authenticate(PASSPORT_JWT, { session: false }, (error, user, info) => {
    if(error) {
      console.error(ERROR_DATABASE, error);
      res.status(HTTP_ERROR_DATABASE).json({ default: error });
    } else if(info) {
      console.error(ERROR_AUTH_FAIL, info);
      res.status(HTTP_ERROR_AUTH_FAIL).json({ default: info });
    
    // User found 
    } else {
      res.locals.user = user;
      next();
    }
  })(req, res, next);
};

const adminRoleMiddleware = (_req, res, next, role) => {
  const { user: { roles } } = res.locals;
  if(roles.includes(role)) {
    next();
  } else {
    res.status(HTTP_ERROR_UNAUTHORIZED).json({ message: "You do not have the role to perform this action" });
  }
};

/**
 * Admin middlewares - Validates roles before passing to routes performing role actions.
 */
export const userRoleMiddleware = () => (req, res, next) => adminRoleMiddleware(req, res, next, ROLE_USER_MANAGER);

// export const templateRoleMiddleware = () => adminRoleMiddleware(ROLE_TEMPLATE_MANAGER)

// export const dataRoleMiddleware = () => adminRoleMiddleware(ROLE_DATA_MANAGER);

// export const packageRoleMiddleware = () => adminRoleMiddleware(ROLE_PACKAGE_MANAGER);

// export const organizationRoleMiddleware = () => adminRoleMiddleware(ROLE_ORGANIZATION_MANAGER);

const setupAuthentication = (helpers) => {
  userAuthentication(helpers);
  loginAuthentication(helpers);
  registerAuthentication(helpers);
};

export default setupAuthentication;