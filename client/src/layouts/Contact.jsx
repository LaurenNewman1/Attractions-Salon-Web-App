import React from 'react';
import {
  Button, Grid, ListItemIcon, ListItemText, Typography, useTheme, Link, Paper,
} from '@material-ui/core';
import {
  Place, Email, Call, Facebook,
} from '@material-ui/icons';
import Page from '../components/Page';
import useStyles from '../css/ContactStyles';
import Review from '../components/Review';

const Contact = () => {
  const classes = useStyles();
  const theme = useTheme();
  return (

    <Page>
      <div className={classes.paper}>
      <h1 style={{ color: 'black', fontSize: '50px' }}>Contact Us</h1>
        <Grid container spacing={3}  alignItems="center"
  justify="center">


          <Grid item xs={6} >

            
            <Grid
              item
              xs={6}
              bgcolor="white"
              mx={0.5}
              
              // className={classes.text}
            >
              <Paper elevation={3} style={{ height: '500px', flexDirection:"column", display:"flex", alignItems:"center", justifyContent:"center", backgroundColor:theme.palette.primary.light }}>
                <ListItemText
                  justify="center"
                  
                  top="100px"
                  primary={(
                    <Typography type="body2" style={{ color: 'black' }}>
                      <ListItemIcon style={{ color: 'black' }}><Place /></ListItemIcon>
                      {' '}
                      address
                    </Typography>
)}
                  secondary={(
                    <Typography type="body2" style={{ color: theme.palette.primary.light }}>
                      <Link style={{ color: "white" }} href="https://www.google.com/search?hl=en&sxsrf=ALeKk00YyPQXV5fYZc-YmnA1LxwoYCfeNg:1583648417111&source=hp&ei=nY5kXrS-EKLM1QGnr5kI&q=attractions%20salon&oq=attractions+salon&gs_l=psy-ab.3..35i39l2j0l8.1510.3107..3214...1.0..0.137.1766.2j14......0....1..gws-wiz.......0i131j0i67j0i20i263j0i131i20i263.LCrgGsRGmXM&ved=2ahUKEwjGkeeKnoroAhW7kHIEHeCdDawQvS4wAnoECAsQOg&uact=5&npsic=0&rflfq=1&rlha=0&rllag=29073323,-81928629,80437&tbm=lcl&rldimm=1918519656102451080&lqi=ChFhdHRyYWN0aW9ucyBzYWxvblomChFhdHRyYWN0aW9ucyBzYWxvbiIRYXR0cmFjdGlvbnMgc2Fsb24&rldoc=1&tbs=lrf:!1m4!1u3!2m2!3m1!1e1!1m4!1u2!2m2!2m1!1e1!1m5!1u15!2m2!15m1!1shas_1wheelchair_1accessible_1entrance!4e2!2m1!1e2!2m1!1e3!3sIAE,lf:1,lf_ui:2&rlst=f#rlfi=hd:;si:1918519656102451080,l,ChFhdHRyYWN0aW9ucyBzYWxvblomChFhdHRyYWN0aW9ucyBzYWxvbiIRYXR0cmFjdGlvbnMgc2Fsb24;mv:[[30.457076299999997,-79.8708192],[27.441068599999998,-90.3248397]];tbs:lrf:!1m4!1u3!2m2!3m1!1e1!1m4!1u2!2m2!2m1!1e1!2m1!1e2!2m1!1e3!3sIAE,lf:1,lf_ui:2">
                        4509 NW 23 Ave, Gainesville, FL 32606
                      </Link>
                    </Typography>
)}
                />
                <ListItemText
                  align="center"
                  
                // className={classes.paper}
                  primary={(
                    <Typography type="body2" style={{ color: 'black' }}>
                      <ListItemIcon style={{ color: 'black' }}><Call /></ListItemIcon>
                      {' '}
                      call
                    </Typography>
)}
                  secondary={<Typography type="body2" style={{ color: "white" }}>(352) 376-6008</Typography>}
                />
                <ListItemText
                
                // className={classes.paper}
                  align="center"
                  primary={(
                    <Typography type="body2" style={{ color: 'black' }}>
                      <ListItemIcon style={{ color: 'black' }}><Email /></ListItemIcon>
                      {' '}
                      e-mail
                    </Typography>
)}
                  secondary={<Typography type="body2" style={{ color: "white" }}>attractions.salon@gmail.com</Typography>}
                />
                <ListItemText
               
                // className={classes.paper}
                  align="center"
                  primary={(
                    <Typography type="body2" style={{ color: 'black' }}>
                      <div>
                        <ListItemIcon style={{ color: 'black' }}>
                          <Facebook />
                          {' '}

                        </ListItemIcon>
                        {' '}

                        social
                      </div>
                      <Link style={{ color: "white" }} href="https://www.facebook.com/pages/Attractions-Salon/746300208837896">
                        facebook
                      </Link>
                    </Typography>
)}
                  secondary={<Typography type="body2" style={{ color: "white" }} />}
                />
              </Paper>
            </Grid>
            {/* <Review /> */}
          </Grid>
          {/* <Paper elevation={3}> */}
        
            <Review />
        
          {/* </Paper> */}
          <Button className={classes.button} variant="contained" color="primary" href="https://www.google.com/search?hl=en&sxsrf=ALeKk00YyPQXV5fYZc-YmnA1LxwoYCfeNg:1583648417111&source=hp&ei=nY5kXrS-EKLM1QGnr5kI&q=attractions%20salon&oq=attractions+salon&gs_l=psy-ab.3..35i39l2j0l8.1510.3107..3214...1.0..0.137.1766.2j14......0....1..gws-wiz.......0i131j0i67j0i20i263j0i131i20i263.LCrgGsRGmXM&ved=2ahUKEwjGkeeKnoroAhW7kHIEHeCdDawQvS4wAnoECAsQOg&uact=5&npsic=0&rflfq=1&rlha=0&rllag=29073323,-81928629,80437&tbm=lcl&rldimm=1918519656102451080&lqi=ChFhdHRyYWN0aW9ucyBzYWxvblomChFhdHRyYWN0aW9ucyBzYWxvbiIRYXR0cmFjdGlvbnMgc2Fsb24&rldoc=1&tbs=lrf:!1m4!1u3!2m2!3m1!1e1!1m4!1u2!2m2!2m1!1e1!1m5!1u15!2m2!15m1!1shas_1wheelchair_1accessible_1entrance!4e2!2m1!1e2!2m1!1e3!3sIAE,lf:1,lf_ui:2&rlst=f#rlfi=hd:;si:1918519656102451080,l,ChFhdHRyYWN0aW9ucyBzYWxvblomChFhdHRyYWN0aW9ucyBzYWxvbiIRYXR0cmFjdGlvbnMgc2Fsb24;mv:[[30.457076299999997,-79.8708192],[27.441068599999998,-90.3248397]];tbs:lrf:!1m4!1u3!2m2!3m1!1e1!1m4!1u2!2m2!2m1!1e1!2m1!1e2!2m1!1e3!3sIAE,lf:1,lf_ui:2">
          Review
        </Button>
        </Grid>
        {/* <Button className={classes.button} variant="contained" color="primary" href="https://www.google.com/search?hl=en&sxsrf=ALeKk00YyPQXV5fYZc-YmnA1LxwoYCfeNg:1583648417111&source=hp&ei=nY5kXrS-EKLM1QGnr5kI&q=attractions%20salon&oq=attractions+salon&gs_l=psy-ab.3..35i39l2j0l8.1510.3107..3214...1.0..0.137.1766.2j14......0....1..gws-wiz.......0i131j0i67j0i20i263j0i131i20i263.LCrgGsRGmXM&ved=2ahUKEwjGkeeKnoroAhW7kHIEHeCdDawQvS4wAnoECAsQOg&uact=5&npsic=0&rflfq=1&rlha=0&rllag=29073323,-81928629,80437&tbm=lcl&rldimm=1918519656102451080&lqi=ChFhdHRyYWN0aW9ucyBzYWxvblomChFhdHRyYWN0aW9ucyBzYWxvbiIRYXR0cmFjdGlvbnMgc2Fsb24&rldoc=1&tbs=lrf:!1m4!1u3!2m2!3m1!1e1!1m4!1u2!2m2!2m1!1e1!1m5!1u15!2m2!15m1!1shas_1wheelchair_1accessible_1entrance!4e2!2m1!1e2!2m1!1e3!3sIAE,lf:1,lf_ui:2&rlst=f#rlfi=hd:;si:1918519656102451080,l,ChFhdHRyYWN0aW9ucyBzYWxvblomChFhdHRyYWN0aW9ucyBzYWxvbiIRYXR0cmFjdGlvbnMgc2Fsb24;mv:[[30.457076299999997,-79.8708192],[27.441068599999998,-90.3248397]];tbs:lrf:!1m4!1u3!2m2!3m1!1e1!1m4!1u2!2m2!2m1!1e1!2m1!1e2!2m1!1e3!3sIAE,lf:1,lf_ui:2">
          Review
        </Button> */}
      </div>
    </Page>
  );
};

export default Contact;
