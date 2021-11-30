import React, { useState } from "react";
import RestaurantDataService from "../services/restaurant";
import { Link } from "react-router-dom";
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';
import { Button, TextField } from "@material-ui/core";

const AddReview = props => {
  let initialReviewState = ""

  let editing = false;

  if (props.location.state && props.location.state.currentReview) {
    editing = true;
    initialReviewState = props.location.state.currentReview.text
  }

  const [review, setReview] = useState(initialReviewState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    setReview(event.target.value);
  };

  const saveReview = () => {
    var data = {
      text: review,
      name: props.user.name,
      user_id: props.user.id,
      restaurant_id: props.match.params.id
    };

    if (editing) {
      data.review_id = props.location.state.currentReview._id
      RestaurantDataService.updateReview(data)
        .then(response => {
          setSubmitted(true);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      RestaurantDataService.createReview(data)
        .then(response => {
          setSubmitted(true);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }

  };

  return (
    <div>
      {props.user ? (
      <div className="submit-form">
        {submitted ? (
          <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}>
            <h4>Review  submitted successfully!</h4>
            <Link to={"/restaurants/" + props.match.params.id} style={{textDecoration:"none", textShadow:"inherit"}}>
              <Button variant="contained"  style={{  fontFamily: "Roboto", fontSize: "15px" , backgroundColor:"lightgreen"}}>
              Back to Restaurant
              </Button>
            </Link>
          </div>
        ) : (
          <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}>
            <div className="form-group" >
              <label htmlFor="description"><h3>{ editing ? "Edit" : "Create" } Review</h3></label>
              <TextField 
                className="form-control"
                id="standard-basic"
                autoComplete="off"
                label="Write Here" 
                required
                value={review}
                onChange={handleInputChange}
                name="text"
              />
            </div>
            <br />
            <Button variant="contained"   onClick={saveReview} className="btn btn-success"  style={{ textDecoration: "none", color: "darkslategrey", fontFamily: "Roboto", fontSize: "20px" , backgroundColor:"lightcyan"}}>
              Submit
            </Button>
          </div>
        )}
      </div>

      ) : (
      <div style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        justifyContent:"center",
        alignItems:"center"
        }}>
        <ErrorOutlineOutlinedIcon fontSize="large" color="error"/>
        <p style={{fontSize:"30px"}}>Please Login to add a REVIEW.</p>
      </div>
      )}

    </div>
  );
};

export default AddReview;