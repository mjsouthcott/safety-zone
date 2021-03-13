const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/auth.controller');
const {
  login,
  register,
  refresh,
  sendPasswordReset,
  passwordReset,
} = require('../../validations/auth.validation');

const router = express.Router();

/**
 * @api {post} api/v1/auth/register Register
 * @apiDescription Register a new user
 * @apiVersion 1.0.0
 * @apiName Register
 * @apiGroup Auth
 * @apiPermission public
 *
 * @apiParam  {String}             email     User's email
 * @apiParam  {String{..128}}      name      User's name
 * @apiParam  {String}             rank      User's rank
 * @apiParam  {String}             mosid     User's mosid
 * @apiParam  {String{2..30}}      office    User's office
 * @apiParam  {String{10..14}}     telephone User's telephone
 * @apiParam  {String}             picture   User's picture
 * @apiParam  {String{6..128}}     password  User's password
 *
 * @apiSuccess (Created 201) {String}  token.tokenType     Access Token's type
 * @apiSuccess (Created 201) {String}  token.accessToken   Authorization Token
 * @apiSuccess (Created 201) {String}  token.refreshToken  Token to get a new accessToken
 *                                                   after expiration time
 * @apiSuccess (Created 201) {Number}  token.expiresIn     Access Token's expiration time
 *                                                   in miliseconds
 * @apiSuccess (Created 201) {String}  token.timezone      The server's Timezone
 *
 * @apiSuccess (Created 201) {String}  user.id         User's id
 * @apiSuccess (Created 201) {String}  user.name       User's name
 * @apiSuccess (Created 201) {String}  user.rank       User's rank
 * @apiSuccess (Created 201) {String}  user.mosid      User's mosid
 * @apiSuccess (Created 201) {String}  user.office     User's office
 * @apiSuccess (Created 201) {String}  user.telephone  User's telephone
 * @apiSuccess (Created 201) {String}  user.picture    User's picture
 * @apiSuccess (Created 201) {String}  user.email      User's email
 * @apiSuccess (Created 201) {String}  user.role       User's role
 * @apiSuccess (Created 201) {Date}    user.createdAt  Timestamp
 *
 * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
 */
router.route('/register')
  .post(validate(register), controller.register);

/**
 * @api {post} api/v1/auth/login Login
 * @apiDescription Get an accessToken
 * @apiVersion 1.0.0
 * @apiName Login
 * @apiGroup Auth
 * @apiPermission public
 *
 * @apiParam  {String}         email     User's email
 * @apiParam  {String{..128}}  password  User's password
 *
 * @apiSuccess  {String}  token.tokenType     Access Token's type
 * @apiSuccess  {String}  token.accessToken   Authorization Token
 * @apiSuccess  {String}  token.refreshToken  Token to get a new accessToken
 *                                                   after expiration time
 * @apiSuccess  {Number}  token.expiresIn     Access Token's expiration time
 *                                                   in miliseconds
 *
 * @apiSuccess  {String}  user.id             User's id
 * @apiSuccess  {String}  user.name           User's name
 * @apiSuccess  {String}  user.rank           yarnUser's rank
 * @apiSuccess  {String}  user.mosid          User's mosid
 * @apiSuccess  {String}  user.office         User's office
 * @apiSuccess  {String}  user.telephone      User's telephone
 * @apiSuccess  {String}  user.picture        User's picture
 * @apiSuccess  {String}  user.email          User's email
 * @apiSuccess  {String}  user.role           User's role
 * @apiSuccess  {Date}    user.createdAt      Timestamp
 *
 * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
 * @apiError (Unauthorized 401)  Unauthorized     Incorrect email or password
 */
router.route('/login')
  .post(validate(login), controller.login);

/**
 * @api {post} api/v1/auth/refresh-token Refresh Token
 * @apiDescription Refresh expired accessToken
 * @apiVersion 1.0.0
 * @apiName RefreshToken
 * @apiGroup Auth
 * @apiPermission public
 *
 * @apiParam  {String}  email         User's email
 * @apiParam  {String}  refreshToken  Refresh token aquired when user logged in
 *
 * @apiSuccess {String}  tokenType     Access Token's type
 * @apiSuccess {String}  accessToken   Authorization Token
 * @apiSuccess {String}  refreshToken  Token to get a new accessToken after expiration time
 * @apiSuccess {Number}  expiresIn     Access Token's expiration time in miliseconds
 *
 * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
 * @apiError (Unauthorized 401)  Unauthorized     Incorrect email or refreshToken
 */
router.route('/refresh-token')
  .post(validate(refresh), controller.refresh);

router.route('/send-password-reset')
  .post(validate(sendPasswordReset), controller.sendPasswordReset);

router.route('/reset-password')
  .post(validate(passwordReset), controller.resetPassword);

module.exports = router;
