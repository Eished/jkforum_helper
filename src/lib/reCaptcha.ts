export const reCaptcha = () => {
  Window.prototype.onloadCaptchaCallback = function () {
    const onCaptchaChange = (token: string) => {
      GM_setValue('CaptchaValue', token);
    };
    grecaptcha.render('reCaptcha', {
      sitekey: '6LfxHOIUAAAAAJ-E2oORT8_zgG3Ia0QM1sg9Pe2s',
      callback: onCaptchaChange,
    });
  };
  const script = document.createElement('script');
  script.src = 'https://www.google.com/recaptcha/api.js?onload=onloadCaptchaCallback&render=explicit';
  script.async = true;
  script.defer = true;
  document.head.append(script);
};
