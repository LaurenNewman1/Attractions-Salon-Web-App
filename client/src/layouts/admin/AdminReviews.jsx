import React, { useState } from 'react';
import {
  Typography, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary,
  TextField, ExpansionPanelActions, Button, Fab, Dialog, DialogActions,
  DialogContent, DialogTitle,
} from '@material-ui/core';
import {
  ExpandMore, Add,
} from '@material-ui/icons';
import Page from '../../components/Page';
import useStyles from '../../css/AdminReviewsStyles';
import useReviews from '../../stores/ReviewsStore';
import Loading from '../../components/Loading';
import HeartRating from '../../components/HeartRating';

const AdminReviews = () => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    rating: 5,
    content: '',
  });

  const [reviews, loading] = useReviews();

  const updateNewReview = (...argus) => {
    const newFields = { ...newReview };
    argus.forEach((argu) => {
      console.log(argu);
      const [fieldName, val] = argu;
      newFields[fieldName] = val;
      console.log(newFields);
    });
    setNewReview(newFields);
  };

  const expandChange = (panel) => (event, isExpanded) => {
    setOpen(isExpanded ? panel : false);
  };

  const renderName = (name, panel) => {
    if (open === panel) {
      return (
        <TextField
          defaultValue={name}
          onClick={(event) => event.stopPropagation()}
        />
      );
    }
    return (
      <Typography>{name}</Typography>
    );
  };

  return (
    <Page maxWidth="md">
      <Typography
        className={classes.header}
        align="center"
        variant="h4"
        display="block"
        gutterBottom
      >
        <div style={{ width: 40 }} />
        Reviews
        <Fab color="primary" aria-label="add" size="small" onClick={() => setDialog(true)}>
          <Add />
        </Fab>
      </Typography>
      {loading ? <Loading />
        : (reviews.map((review, index) => (
          <ExpansionPanel
            key={review.id}
            expanded={open === index}
            onChange={expandChange(index)}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMore />}>
              {renderName(review.name, index)}
            </ExpansionPanelSummary>
            <ExpansionPanelDetails style={{ display: 'block' }}>
              <HeartRating edit />
              <TextField
                className={classes.content}
                label="Content"
                multiline
                defaultValue={review.content}
              />
            </ExpansionPanelDetails>
            <ExpansionPanelActions>
              <Button variant="contained">Delete</Button>
              <div className={classes.grow} />
              <Button>Cancel</Button>
              <Button variant="contained" color="primary">Save</Button>
            </ExpansionPanelActions>
          </ExpansionPanel>
        ))
        )}
      <Dialog open={dialog} onClose={() => setDialog(false)} aria-labelledby="form-dialog">
        <DialogTitle>Add a Review</DialogTitle>
        <DialogContent>
          <HeartRating
            edit
            onChange={(val) => updateNewReview(['rating', val])}
            defaultValue={newReview.rating}
          />
          <TextField
            style={{ width: '100%', paddingBottom: 6 }}
            label="Name"
            value={newReview.name}
            onChange={(event) => updateNewReview(['name', event.target.value])}
          />
          <TextField
            style={{ width: '100%' }}
            label="Content"
            multiline
            value={newReview.content}
            onChange={(event) => updateNewReview(['content', event.target.value])}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialog(false)}>
            Cancel
          </Button>
          <Button variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Page>
  );
};

export default AdminReviews;
