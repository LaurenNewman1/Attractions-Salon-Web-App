import React from 'react';
import {
  Grid, Typography, Button,
} from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import Page from '../components/Page';
import useStyles from '../css/ContactStyles';
import Review from '../components/Review';
import Loading from '../components/Loading';
import useReviews from '../stores/ReviewsStore';

const Reviews = () => {
  const classes = useStyles();
  const writeLink = 'https://www.google.com/search?hl=en&sz=0&biw=1163&bih=525&sxsrf=ALeKk02BMbJ5Tblu5CZegNTHuJdbfRCjjw%3A1583785336676&ei=eKVmXovsKOazggeqoZTIDA&q=attractions+salon+gainesville+fl&oq=attractions+salon+gain&gs_l=psy-ab.3.0.35i39j0i22i30j38.2276.3020..3719...0.2..0.123.563.0j5......0....1..gws-wiz.......0i71j0j0i67.sH67MvhnGqw#lrd=0x88e8bb527c8cb42d:0x1a9ff37664975788,3,,,';
  const moreLink = 'https://www.google.com/search?q=attractions+salon+gainesville+fl&rlz=1C1CHBF_enUS802US802&oq=attr&aqs=chrome.0.69i59j69i57j69i59j69i60l5.989j0j4&sourceid=chrome&ie=UTF-8#lrd=0x88e8bb527c8cb42d:0x1a9ff37664975788,1,,,';

  const [reviews, loading] = useReviews();

  return (
    <Page maxWidth="md">
      {loading ? <Loading disableShrink />
        : (
          <Grid container>
            <Grid item xs={12} className={classes.rightContainer}>
              <Typography variant="h3" align="center" display="block" gutterbottom>Client Reviews</Typography>
              <div className={classes.buttons}>
                <Button
                  color="primary"
                  variant="contained"
                  target="_blank"
                  href={writeLink}
                  startIcon={<Edit />}
                >
                  Write A Review
                </Button>
              </div>
              <Grid container spacing={2} className={classes.reviewContainer}>
                {!reviews.length ? null
                  : reviews.map((reviewDetail) => (
                    // Only display ones with review content
                    reviewDetail.review.length
                      ? (
                        <Grid item xs={12} sm={6} key={reviewDetail._id}>
                          <Review review={reviewDetail} />
                        </Grid>
                      ) : null
                  ))}
              </Grid>
              <div className={classes.buttons}>
                <Button
                  color="primary"
                  style={{ textDecoration: 'underline' }}
                  target="_blank"
                  href={moreLink}
                >
                  View More
                </Button>
              </div>
            </Grid>
          </Grid>
        )}
    </Page>
  );
};

export default Reviews;
