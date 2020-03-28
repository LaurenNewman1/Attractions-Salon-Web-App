import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
import GetLogger from '../config/logger';

dotenv.config();
const logger = GetLogger('SendGrid Mail');

if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
} else {
  throw new Error('Attempted to load the mail library without SENDGRID_API_KEY defined!');
}

const textMsg = {
  template_id: 'd-e4ef83dc5ec541038bad057d752dd6cd',
  from: {
    email: 'attractions-salon@attractionssalon.com',
    name: 'Attractions Salon',
  },
};

const unsubscribeData = {
  Sender_Name: 'Attractions Salon',
  Sender_Address: '4509 NW 23 Ave',
  Sender_City: 'Gainesville',
  Sender_State: 'Florida',
  Sender_Zip: '32606',
};

export const SendForgetPassword = async (email, token, onlyProd = true) => {
  if (process.env.NODE_ENV !== 'production' && onlyProd) return true;

  try {
    await sgMail.send({
      ...textMsg,
      template_id: 'd-2eacea9ec7b94dd59daa1d4ef1acc42c',
      personalizations: [{
        dynamic_template_data: {
          ...unsubscribeData,
          code: token,
          subject: 'Someone is trying to reset your password',
        },
        to: email,
      }],
    });
    return true;
  } catch (err) {
    logger.error(err.toString());
    return false;
  }
};

export const SendConfirmationEmail = async (userID, confirmToken) => {

};

export const SendTextEmail = async (to, subject, text, onlyProd = true) => {
  if (process.env.NODE_ENV !== 'production' && onlyProd) return true;

  try {
    await sgMail.send({
      ...textMsg,
      personalizations: [{
        dynamic_template_data: {
          ...unsubscribeData,
          text,
          subject,
        },
        to,
      }],
    });
    return true;
  } catch (err) {
    logger.error(err.toString());
    return false;
  }
};
