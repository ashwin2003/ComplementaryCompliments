import React, { useState, useEffect } from "react";
import RestaurantDataService from "../services/restaurant";
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card'; 
import ChatBubbleOutlineSharpIcon from '@material-ui/icons/ChatBubbleOutlineSharp';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';



const useStyles = makeStyles((theme) => ({
  root: {
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
  },
  divider: {
  },
}));



const Restaurant = props => {
  const initialRestaurantState = {
    id: null,
    name: "",
    address: {},
    cuisine: "",
    reviews: []
  };
  const [restaurant, setRestaurant] = useState(initialRestaurantState);

  const getRestaurant = id => {
    RestaurantDataService.get(id)
      .then(response => {
        setRestaurant(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getRestaurant(props.match.params.id);
  }, [props.match.params.id]);

  const deleteReview = (reviewId, index) => {
    RestaurantDataService.deleteReview(reviewId, props.user.id)
      .then(response => {
        setRestaurant((prevState) => {
          prevState.reviews.splice(index, 1)
          return ({
            ...prevState
          })
        })
      })
      .catch(e => {
        console.log(e);
      });
  };
  const classes = useStyles();
  return (
    <div>
      {restaurant ? (
        <div>
          <h2>{restaurant.name}</h2>
          <p>
            <p style={{ fontSize: "22px", fontfamily: 'Poppins' }}>Cuisine: {restaurant.cuisine} <br />
             Address: {restaurant.address.building} {restaurant.address.street}, {restaurant.address.zipcode} </p>
          </p>

          <Link to={"/restaurants/" + props.match.params.id + "/review"} style={{ textDecoration: "none" }} >
            <Button variant="contained" style={{ color: "darkslategrey", fontFamily: "inherit", fontSize: "15px", backgroundColor: "lightcyan" }}>
              Add Review
             </Button>
          </Link> 
          <div style={{height:"20px"}} />

          <h4> Reviews:- </h4> 
          <div className="row">
            {restaurant.reviews.length > 0 ? (
              restaurant.reviews.map((review, index) => {

                return (
                  <div className="col-lg-4 " key={index}>
                    <Card className={classes.root} style={{ backgroundColor: "lightsteelblue", height: "230px" }}>

                      <ChatBubbleOutlineSharpIcon fontSize="large" style={{ margin: "10px" }} />

                      <div className="card-text" style={{ padding: "10px" }}>
                        <h5> {review.text} </h5>
                        <strong>User: </strong>{review.name}<br />
                        <strong>Date: </strong>{review.date}
                      </div>
                      {props.user && props.user.id === review.user_id &&
                        <div className="row" style={{ marginLeft: "10px" }}>
                          <Link to={{
                            pathname: "/restaurants/" + props.match.params.id + "/review",
                            state: {
                              currentReview: review
                            }
                          }} className="btn btn-primary col-lg-5 mx-1 mb-1" style={{ backgroundColor: "royalblue", borderColor: "transparent", paddingRight: "10px" }} ><EditIcon /></Link>

                          <a onClick={() => deleteReview(review._id, index)} className="btn btn-primary col-lg-5 mx-1 mb-1" style={{ backgroundColor: "tomato", borderColor: "transparent" }} ><DeleteIcon /></a>
                        </div>
                      }
                    </Card>
                  </div>
                );
              })
            ) : (
              <div className="col-sm-4" style={{  fontSize: "25px" }}>No reviews yet. 
              </div>
            )}

          </div>

        </div>
      ) : (
        <div>
          <br />
          <p>No restaurant selected.</p>
        </div>
      )}
    </div>
  );
};

export default Restaurant;