export const API_MAIL = `${process.env.API_PREFIX}/api/mail`;

export const defaultBody = '\n\nSent from iPortfolio';

export const initialValues = {
  to: 'hello@webguyian.com',
  from: '',
  subject: '',
  body: defaultBody
};
