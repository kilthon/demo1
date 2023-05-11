import Koa from 'koa';
// import { Code } from '../db/index.ts';
// import { create_token } from '../../utils/token.ts';
import svgCaptcha from 'svg-captcha';

// 获取验证码
export const getCode = async (ctx: Koa.Context) => {
  const options = {
    // 4个字符
    size: 4,
    // 干扰线2条
    noise: Math.floor(Math.random() * 5),
    // 文字颜色
    color: true,
    background: '#666',
  };
  const captcha = svgCaptcha.create(options);
  // ctx.response.type = 'image/svg+xml';
  // 并不是每个请求都会产生session并返回，只有当处理请求时使用session存放内容才会生成session并返回对应sessionId
  if (ctx.session) {
    ctx.session.captcha = captcha.text;
  }
  ctx.body = {
    code: 200,
    msg: '验证码获取成功！',
    data: {
      svg: captcha.data,
    },
  };
};
