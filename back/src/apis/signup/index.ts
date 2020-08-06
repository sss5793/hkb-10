import { Router } from "express";

import signup from "./signup";

const signupRouter = Router();

/**
 * @api {post} /signup  새로운 유저를 추가함
 * @apiName Signup
 * @apiGroup User
 *
 * @apiParam {String} [id] 아이디
 * @apiParam {String} [password] 패스워드
 *
 * @apiSuccess {boolean} success  호출 성공 여부
 */
signupRouter.post("/", signup);

// Export the base-router
export default signupRouter;
