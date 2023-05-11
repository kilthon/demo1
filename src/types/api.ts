import svgCaptcha from 'svg-captcha';

export type loginType = {
  name: string;
  pwd: string;
};

export type registerType = {
  name: string;
  pwd: string;
  code: string;
};

export type codeType = {
  captcha: svgCaptcha.CaptchaObj;
  token: string;
};
