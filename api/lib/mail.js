import sgMail from '@sendgrid/mail';
import GetLogger from '../config/logger';

const logger = GetLogger('SendGrid Mail');

if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
} else {
  logger.error('Attempted to load the mail library without the api key set!');
}

const textMsg = {
  template_id: 'd-e4ef83dc5ec541038bad057d752dd6cd',
  from: {
    email: 'attractions-salon@attractionssalon.com',
    name: 'Attractions Salon',
  },
};

export const SendConfirmationEmail = async (userID, confirmToken) => {

};

export const SendTextEmail = async (to, subject, text, onlyProd = true) => {
  if (process.env.NODE_ENV !== 'production' && onlyProd) return true;

  try {
    await sgMail.send({
      ...textMsg,
      to,
      subject,
      text,
    });
    return true;
  } catch (err) {
    logger.error(err.toString());
    return false;
  }
};
