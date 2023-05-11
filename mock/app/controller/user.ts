import Koa from 'koa';
import sha1 from 'sha1';
import xss from 'xss';
import { create_token } from '../../utils/token.ts';
import { loginType, registerType } from '@/types/api.ts';
// import { loginType } from '@/types/api.ts';
import { User } from '../db/index.ts';
import { config } from '../../utils/config.ts';

export const login = async (ctx: Koa.Context) => {
  const req: loginType = JSON.parse(ctx.request.rawBody);
  const { pwd, name } = req;
  const xssname = xss(name);
  const nameFind = await User.find({ name: xssname });
  if (nameFind) {
    const user_pwd = sha1(sha1(name + pwd + config.PWD_ENCODE_STR));
    const res = await User.find({ name: xssname, pwd: user_pwd });
    if (res) {
      ctx.body = {
        code: 200,
        msg: '登录成功',
        data: {
          token: res[0].token,
        },
      };
    } else {
      ctx.body = {
        code: 401,
        msg: '登录失败，密码错误',
      };
    }
  } else {
    ctx.body = {
      code: 401,
      msg: '登录失败，用户名不存在',
    };
  }
};

export const register = async (ctx: Koa.Context) => {
  const req: registerType = JSON.parse(ctx.request.rawBody);
  let { name } = req;
  const { pwd, code } = req;
  if (ctx?.session?.captcha) {
    if (code === ctx.session.captcha) {
      name = xss(name);
      const token = create_token(name);
      const user_pwd = sha1(sha1(name + pwd + config.PWD_ENCODE_STR));
      const user = new User({ name, pwd: user_pwd, token });
      const res = await user.save();
      if (res) {
        ctx.body = {
          code: 200,
          msg: '注册成功！',
          data: {
            token,
          },
        };
      }
    } else {
      ctx.body = {
        code: 401,
        msg: '注册失败，验证码错误',
      };
    }
  } else {
    ctx.body = {
      code: 500,
      msg: '服务器异常',
    };
  }
};
