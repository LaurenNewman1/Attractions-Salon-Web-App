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
import Confirm from '../../components/Confirm';
import useStyles from '../../css/AdminReviewsStyles';
import useReviews from '../../stores/ReviewsStore';
import Loading from '../../components/Loading';
import HeartRating from '../../components/HeartRating';
import Alert, { TYPE_SUCCESS, TYPE_ERROR } from '../../components/Alert';

const AdminReviews = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [viewing, setViewing] = useState({});
  const [alert, setAlert] = useState({
    open: false,
    type: '',
    text: '',
  });

  const [reviews, loading, newReview, updateReviews,
    updateNewReview, deleteReview, addReview, saveReview] = useReviews();

  const onClickAdd = async () => {
    setDialog(false);
    const success = await addReview();
    setAlert({
      open: true,
      type: success ? TYPE_SUCCESS : TYPE_ERROR,
      text: success ? 'Review added successfully.' : 'Failed to add review.',
    });
  };

  const onClickDelete = async (_id) => {
    setConfirmDelete(false);
    setOpen(false);
    const success = await deleteReview(_id);
    setAlert({
      open: true,
      type: success ? TYPE_SUCCESS : TYPE_ERROR,
      text: success ? 'Review deleted successfully.' : 'Deletion failed.',
    });
  };

  const onClickSave = async (index) => {
    const success = await saveReview(index);
    setAlert({
      open: true,
      type: success ? TYPE_SUCCESS : TYPE_ERROR,
      text: success ? 'Review saved successfully.' : 'Save failed.',
    });
    setOpen(false);
  };

  const cancelChanges = (index) => {
    updateReviews(index, ['reviewer', viewing.reviewer], ['rating', viewing.rating], ['review', viewing.review]);
    setOpen(false);
  };

  const expandChange = (panel) => (event, isExpanded) => {
    // cancel any previously closed ones
    if (open !== false) {
      cancelChanges(open);
    }
    // save history on newly opened ones
    if (isExpanded) {
      setViewing({ ...reviews[panel] });
    } else { // cancel if closing
      cancelChanges(panel);
    }
    setOpen(isExpanded ? panel : false);
  };

  const renderName = (name, panel) => {
    if (open === panel) {
      return (
        <TextField
          value={name}
          onClick={(event) => event.stopPropagation()}
          onChange={(event) => updateReviews(panel, ['reviewer', event.target.value])}
        />
      );
    }
    return (
      <Typography>{name}</Typography>
    );
  };

  return (
    <Page maxWidth="md">
      {loading ? <Loading disableShrink /> : null}
      <div style={{ paddingTop: 5 }}>
        <h1
          className={classes.header}
          align="center"
          display="block"
          gutterBottom
        >
          <div style={{ width: 40 }} />
          Reviews
          <Fab color="primary" size="small" onClick={() => setDialog(true)}>
            <Add />
          </Fab>
        </h1>
      </div>
      {!reviews || !reviews.length ? null
        : (reviews.map((review, index) => (
          <ExpansionPanel
            key={review._id}
            expanded={open === index}
            onChange={expandChange(index)}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMore />}>
              {renderName(review.reviewer, index)}
            </ExpansionPanelSummary>
            <ExpansionPanelDetails style={{ display: 'block' }}>
              <HeartRating
                onChange={(val) => updateReviews(index, ['rating', val])}
                defaultValue={review.rating}
                edit
              />
              <TextField
                className={classes.content}
                label="Content"
                multiline
                value={review.review}
                onChange={(event) => updateReviews(index, ['review', event.target.value])}
              />
            </ExpansionPanelDetails>
            <ExpansionPanelActions>
              <Button variant="contained" onClick={() => setConfirmDelete(index)}>Delete</Button>
              <div className={classes.grow} />
              <Button onClick={() => cancelChanges(index)}>Cancel</Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => onClickSave(index)}
              >
                Save
              </Button>
            </ExpansionPanelActions>
          </ExpansionPanel>
        ))
        )}
      <Dialog open={dialog} onClose={() => setDialog(false)}>
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
            value={newReview.reviewer}
            onChange={(event) => updateNewReview(['reviewer', event.target.value])}
          />
          <TextField
            style={{ width: '100%' }}
            label="Content"
            multiline
            value={newReview.review}
            onChange={(event) => updateNewReview(['review', event.target.value])}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => onClickAdd()}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      {confirmDelete
        ? (
          <Confirm
            open={confirmDelete !== false}
            title={`Delete ${reviews[confirmDelete].reviewer}'s review?`}
            content="Clicking delete will permanently remove this review."
            confirmText="Delete"
            onConfirm={() => onClickDelete(reviews[confirmDelete]._id)}
            onCancel={() => setConfirmDelete(false)}
          />
        ) : null}
      <Alert
        open={alert.open}
        type={alert.type}
        text={alert.text}
        onClose={() => setAlert({ open: false, type: '', text: '' })}
      />
    </Page>
  );
};

export default AdminReviews;
