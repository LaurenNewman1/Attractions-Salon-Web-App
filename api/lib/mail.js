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

// export const SendTextEmail = async (to, subject, text, onlyProd = false) => {
//   if (process.env.NODE_ENV !== 'production' && onlyProd) return true;

//   console.log(onlyProd);
//   try {
//     await sgMail.send({
//       ...textMsg,
//       personalizations: [{
//         dynamic_template_data: {
//           ...unsubscribeData,
//           text,
//           subject,
//         },
//         to,
//       }],
//     });
//     return true;
//   } catch (err) {
//     logger.error(err.toString());
//     return false;
//   }
// };
export const SendTextEmail = async (to, from, name, notes, time, addons, onlyProd = false) => {
  if (process.env.NODE_ENV !== 'production' && onlyProd) return true;

  console.log(onlyProd);
  try {
    await sgMail.send(
      {
        to: to,
        from: 'attractions-salon@attractionssalon.com',
        subject: 'Your Booking has Been Requested',
        html: '<h1 style="text-align:center;">Appointment Requested!</h1><br>' +
        '<p style="text-align:center">Attractions Salon will review your appointment and notify you</p>' +
        '<p style="text-align:center">when your appointment has been confirmed!</p><br>' +
        '<p style="text-align:center">Have any questions? Call us at (123)-456-7890.</p><br>' +
        '<h4 style="text-align:center">Your order details: </h4>' +
        '<p style="text-align:center">Name: ' 
        + name + '</p>' 
        + '<p style="text-align:center">Telephone number: ' 
        + notes + '</p>' 
        + '<p style="text-align:center">Email: ' 
        + time + '</p>' 
        + '<p style="text-align:center">Addons: '
        + addons.map((s) => s.name) + '</p>'
        + '<br><p style="text-align:center">Check out our other services!</p><br>'
        + '<form style="text-align:center" action="https://www.google.com"><input style="background:pink; border:0 none; padding:5px 15px; cursor:pointer; border-radius:5px" type="submit" value="Services" /></form>'
      },
    );
    return true;
  } catch (err) {
    logger.error(err.toString());
    return false;
  }
};

export const SendRequestEmail = async (to, from, name, notes, time, addons, onlyProd = false) => {
  if (process.env.NODE_ENV !== 'production' && onlyProd) return true;

  console.log(onlyProd);
  try {
    await sgMail.send(
      {
        to: to,
        from: 'attractions-salon@attractionssalon.com',
        subject: 'Your Booking has Been Requested',
        html: '<h1 style="text-align:center;">Appointment Pending Request!</h1><br>' +
        '<p style="text-align:center">Attractions Salon will review your appointment and notify you</p>' +
        '<p style="text-align:center">when your appointment has been confirmed!</p><br>' +
        '<p style="text-align:center">Have any questions? Call us at (123)-456-7890.</p><br>' +
        '<h4 style="text-align:center">Your order details: </h4>' +
        '<p style="text-align:center">Name: ' 
        + name + '</p>' 
        + '<p style="text-align:center">Telephone number: ' 
        + notes + '</p>' 
        + '<p style="text-align:center">Email: ' 
        + time + '</p>' 
        + '<p style="text-align:center">Addons: '
        + addons.map((s) => s.name) + '</p>'
        + '<br><p style="text-align:center">Check out our other services!</p><br>'
        + '<form style="text-align:center" action="https://www.google.com"><input style="background:pink; border:0 none; padding:5px 15px; cursor:pointer; border-radius:5px" type="submit" value="Services" /></form>'
      },
    );
    return true;
  } catch (err) {
    logger.error(err.toString());
    return false;
  }
};
// export const SendTextEmail = async (to, from, htmlInput, onlyProd = false) => {
//   if (process.env.NODE_ENV !== 'production' && onlyProd) return true;

//   console.log(onlyProd);
//   try {
//     await sgMail.send(
//       {
//         to: to,
//         from: 'attractions-salon@attractionssalon.com',
//         subject: 'Your Booking has Been Requested',
//         html: htmlInput,
//       },
//     );
//     return true;
//   } catch (err) {
//     logger.error(err.toString());
//     return false;
//   }
// };