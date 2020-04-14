import React, { useState } from 'react';
import { IconButton, makeStyles, MobileStepper } from '@material-ui/core';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';


const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const banners = ['salon5.jpeg', 'salon6.jpeg', 'salon1.jpeg', 'salon2.jpeg', 'salon3.jpeg',
  'salon4.jpeg', 'salon7.jpeg', 'customers1.jpg', 'customers2.jpg'];

const useStyles = makeStyles(() => ({
  img: {
    height: 263,
    display: 'block',
    maxWidth: 400,
    overflow: 'hidden',
    width: '100%',
  },
  swiperContainer: {
    maxWidth: 350,
    flexGrow: 1,
    display: 'inline-block',
  },
  stepper: {
    maxWidth: 350,
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  stepperContainer: {
    width: '600',
    display: 'flex',
    justifyContent: 'center',
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const PhotoCarousel = () => {
  const [activeStep, setActiveStep] = useState(0);
  const classes = useStyles();
  return (
    <>
      <div className={classes.stepperContainer}>
        <div className={classes.buttons}>
          <IconButton
            onClick={() => setActiveStep((prev) => prev - 1)}
            disabled={activeStep === 0}
          >
            <KeyboardArrowLeft />
          </IconButton>
          <div className={classes.swiperContainer}>
            <AutoPlaySwipeableViews
              index={activeStep}
              onChangeIndex={(step) => setActiveStep(step)}
              enableMouseEvents
            >
              {banners.map((banner, index) => (
                <div key={banner}>
                  {Math.abs(activeStep - index) <= 4 ? (
                    <img className={classes.img} src={banner} alt={banner} />
                  ) : null}
                </div>
              ))}
            </AutoPlaySwipeableViews>
          </div>
          <IconButton
            onClick={() => setActiveStep((prev) => prev + 1)}
            disabled={activeStep === banners.length - 1}
          >
            <KeyboardArrowRight />
          </IconButton>
        </div>
      </div>
      <div className={classes.stepperContainer}>
        <MobileStepper
          className={classes.stepper}
          bgcolor="transparent"
          steps={banners.length}
          position="static"
          variant="dots"
          activeStep={activeStep}
        />
      </div>
    </>
  );
};

export default PhotoCarousel;
