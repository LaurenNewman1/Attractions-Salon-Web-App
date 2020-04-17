import React, { useState } from 'react';
import {
  Typography, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary,
  TextField, ExpansionPanelActions, Button, Fab, Dialog, DialogActions,
  DialogContent, DialogTitle, Grid,
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
import Search from '../../components/Search';

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
  const [filters, setFilters] = useState([]);
  const [searchText, setSearchText] = useState('');

  const [reviews, loading, newReview, updateReviews,
    updateNewReview, deleteReview, addReview, saveReview] = useReviews();

  const filterOptions = ['5 stars', '4+ stars', '3+ stars', '2+ stars', '1+ stars', 'has content'];

  const doDisplay = (review) => {
    if (searchText.length && (review.reviewer.toLowerCase().includes(searchText.toLowerCase())
      || (review.review && review.review.toLowerCase().includes(searchText.toLowerCase())))) {
      return true;
    }
    if (searchText.length) {
      return false;
    }
    for (let i = 0; i < filters.length; i += 1) {
      if (filters[i] === 'has content' && (!review.review || !review.review.length)) {
        return false;
      }
      if (filters[i] !== 'has content' && Number(filters[i].charAt(0)) > review.rating) {
        return false;
      }
    }
    return true;
  };

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
    <Page maxWidth="lg">
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
      <Grid container spacing={6} style={{ width: '100%', margin: 0 }}>
        <Grid item xs={12} sm={3}>
          <Search
            filterOptions={filterOptions}
            filters={filters}
            setFilters={(filts) => setFilters(filts)}
            searchText={searchText}
            setSearchText={(text) => setSearchText(text)}
          />
        </Grid>
        <Grid item xs={12} sm={9}>
          {!reviews || !reviews.length ? null
            : (reviews.map((review, index) => (doDisplay(review)
              ? (
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
              )
              : null))
            )}
        </Grid>
      </Grid>
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
