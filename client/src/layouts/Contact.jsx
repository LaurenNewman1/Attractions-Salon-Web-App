import React from 'react';
import {
  Grid, List, ListItem, ListItemText, Button, Link, ListItemIcon, CircularProgress,
} from '@material-ui/core';
import {
  Place, Email, Call, Facebook, AccessTime,
} from '@material-ui/icons';
import Page from '../components/Page';
import useStyles from '../css/ContactStyles';
import Review from '../components/Review';
import ReviewData from '../data/reviews.json';
import fetchReviews from '../stores/ReviewStore';

const Contact = () => {
  const classes = useStyles();
  const writeLink = 'https://www.google.com/search?hl=en&sz=0&biw=1163&bih=525&sxsrf=ALeKk02BMbJ5Tblu5CZegNTHuJdbfRCjjw%3A1583785336676&ei=eKVmXovsKOazggeqoZTIDA&q=attractions+salon+gainesville+fl&oq=attractions+salon+gain&gs_l=psy-ab.3.0.35i39j0i22i30j38.2276.3020..3719...0.2..0.123.563.0j5......0....1..gws-wiz.......0i71j0j0i67.sH67MvhnGqw#lrd=0x88e8bb527c8cb42d:0x1a9ff37664975788,3,,,';
  const moreLink = 'https://www.google.com/search?q=attractions+salon+gainesville+fl&rlz=1C1CHBF_enUS802US802&oq=attr&aqs=chrome.0.69i59j69i57j69i59j69i60l5.989j0j4&sourceid=chrome&ie=UTF-8#lrd=0x88e8bb527c8cb42d:0x1a9ff37664975788,1,,,';
  const addressLink = 'https://www.google.com/search?hl=en&sxsrf=ALeKk00YyPQXV5fYZc-YmnA1LxwoYCfeNg:1583648417111&source=hp&ei=nY5kXrS-EKLM1QGnr5kI&q=attractions%20salon&oq=attractions+salon&gs_l=psy-ab.3..35i39l2j0l8.1510.3107..3214...1.0..0.137.1766.2j14......0....1..gws-wiz.......0i131j0i67j0i20i263j0i131i20i263.LCrgGsRGmXM&ved=2ahUKEwjGkeeKnoroAhW7kHIEHeCdDawQvS4wAnoECAsQOg&uact=5&npsic=0&rflfq=1&rlha=0&rllag=29073323,-81928629,80437&tbm=lcl&rldimm=1918519656102451080&lqi=ChFhdHRyYWN0aW9ucyBzYWxvblomChFhdHRyYWN0aW9ucyBzYWxvbiIRYXR0cmFjdGlvbnMgc2Fsb24&rldoc=1&tbs=lrf:!1m4!1u3!2m2!3m1!1e1!1m4!1u2!2m2!2m1!1e1!1m5!1u15!2m2!15m1!1shas_1wheelchair_1accessible_1entrance!4e2!2m1!1e2!2m1!1e3!3sIAE,lf:1,lf_ui:2&rlst=f#rlfi=hd:;si:1918519656102451080,l,ChFhdHRyYWN0aW9ucyBzYWxvblomChFhdHRyYWN0aW9ucyBzYWxvbiIRYXR0cmFjdGlvbnMgc2Fsb24;mv:[[30.457076299999997,-79.8708192],[27.441068599999998,-90.3248397]];tbs:lrf:!1m4!1u3!2m2!3m1!1e1!1m4!1u2!2m2!2m1!1e1!2m1!1e2!2m1!1e3!3sIAE,lf:1,lf_ui:2';
  const fbLink = 'https://www.facebook.com/pages/Attractions-Salon/746300208837896';

  const [reviews, setReviews] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const size = 4;
  React.useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setReviews(await fetchReviews());
      setLoading(false);
    }
    fetchData();
  }, []);
  console.log(reviews);
  return (
    <Page>
      {loading ? <CircularProgress className={classes.loading} />
        : (
          <Grid container className={classes.page}>
            <Grid item xs={12} sm={3} className={classes.leftContainer}>
              <List>
                <ListItem>
                  <ListItemIcon><Place color="primary" /></ListItemIcon>
                  <ListItemText
                    primary="Address"
                    secondary={(
                      <Link href={addressLink} color="inherit">
                        4509 NW 23 Ave, Gainesville, FL 32606
                      </Link>
                  )}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Call color="primary" /></ListItemIcon>
                  <ListItemText
                    primary="Phone"
                    secondary="(352) 376-6008"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Email color="primary" /></ListItemIcon>
                  <ListItemText
                    primary="Email"
                    secondary="attractions.salon@gmail.com"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Facebook color="primary" /></ListItemIcon>
                  <ListItemText
                    primary="Social"
                    secondary={(
                      <Link href={fbLink} color="inherit">
                        Facebook
                      </Link>
                )}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><AccessTime color="primary" /></ListItemIcon>
                  <ListItemText
                    primary="Hours"
                    secondary="Tuesday - Friday 10 AM - 7 PM"
                  />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} sm={9} className={classes.rightContainer}>
              <h1 className={classes.header}>Contact Us</h1>
              <Grid container spacing={2} className={classes.reviewContainer}>
                {!reviews.length ? null
                  : reviews.slice(0, size).map((reviewDetail) => (
                    <Grid item xs={12} sm={9} md={6} key={reviewDetail._id}>
                      <Review review={reviewDetail} />
                    </Grid>
                  ))}
              </Grid>
              <div className={classes.buttons}>
                <Button
                  color="primary"
                  style={{ textDecoration: 'underline' }}
                  target="_blank"
                  href={writeLink}
                >
                  Write A Review
                </Button>
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

export default Contact;
