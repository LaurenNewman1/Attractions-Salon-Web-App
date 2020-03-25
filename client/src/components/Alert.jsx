// import React, { useState } from 'react';
// import {
//   Snackbar,
// } from '@material-ui/core';
// import PropTypes from 'prop-types';

// const Alert = ({ type, text, onClose }) => {
//   const [open, setOpen] = useState(true);

//   const close = () => {
//     setOpen(false);
//     onClose();
//   };

//   return (
//     <Snackbar
//       open={open}
//       autoHideDuration={2000}
//       anchorOrigin={{
//         vertical: 'bottom',
//         horizontal: 'left',
//       }}
//       onClose={() => close()}
//     >
//       <Alert severity={type}>{text}</Alert>
//     </Snackbar>
//   );
// };

// Alert.propTypes = {
//   type: PropTypes.string,
//   text: PropTypes.string.isRequired,
//   onClose: PropTypes.func.isRequired,
// };

// Alert.defaultProps = {
//   type: 'success',
// };

// export default Alert;
