import React, { useState } from 'react';
import {
  MobileStepper, Button,
} from '@material-ui/core';
import {
  KeyboardArrowLeft, KeyboardArrowRight,
} from '@material-ui/icons';
import Page from '../components/Page';
import useStyles from '../css/BookStyles';
import Details from './Details';
import Calendar from './Calendar';
import NewPayment from './NewPayment';
import ReviewBooking from './ReviewBooking';

const Book = () => {
  const [page, setPage] = useState(0);
  const classes = useStyles();

  const renderPage = () => {
    switch (page) {
      case 0:
        return <Details />;
      case 1:
        return <Calendar />;
      case 2:
        return <NewPayment />;
      case 3:
        return <ReviewBooking />;
      default:
        return null;
    }
  };

  return (
    <Page>
      <div className={classes.page}>
        <div>
          {renderPage()}
        </div>
        <div className={classes.footer}>
          <MobileStepper
            steps={4}
            variant="dots"
            className={classes.stepper}
            activeStep={page}
            nextButton={(
              <Button size="small" onClick={() => setPage((prev) => prev + 1)} disabled={page === 3}>
                Next
                <KeyboardArrowRight />
              </Button>
          )}
            backButton={(
              <Button size="small" onClick={() => setPage((prev) => prev - 1)} disabled={page === 0}>
                <KeyboardArrowLeft />
                Back
              </Button>
          )}
          />
        </div>
      </div>
    </Page>
  );
};


export default Book;
