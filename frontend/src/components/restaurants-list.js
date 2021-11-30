import React, { useState, useEffect } from "react";
import RestaurantDataService from "../services/restaurant";
import { Link } from "react-router-dom";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputLabel from '@material-ui/core/InputLabel';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader'; 
import MapSharpIcon from '@material-ui/icons/MapSharp';
import ChatBubbleOutlineSharpIcon from '@material-ui/icons/ChatBubbleOutlineSharp';
import FastfoodOutlinedIcon from '@material-ui/icons/FastfoodOutlined';



const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));


const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);




const RestaurantsList = props => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchZip, setSearchZip] = useState("");
  const [searchCuisine, setSearchCuisine] = useState("");
  const [cuisines, setCuisines] = useState(["All Cuisines"]);

  useEffect(() => {
    retrieveRestaurants();
    retrieveCuisines();
  }, []);

  const onChangeSearchName = e => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const onChangeSearchZip = e => {
    const searchZip = e.target.value;
    setSearchZip(searchZip);
  };

  const onChangeSearchCuisine = e => {
    const searchCuisine = e.target.value;
    setSearchCuisine(searchCuisine);

  };

  const retrieveRestaurants = () => {
    RestaurantDataService.getAll()
      .then(response => {
        console.log(response.data);
        setRestaurants(response.data.restaurants);

      })
      .catch(e => {
        console.log(e);
      });
  };

  const retrieveCuisines = () => {
    RestaurantDataService.getCuisines()
      .then(response => {
        console.log(response.data);
        setCuisines(["All Cuisines"].concat(response.data));

      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveRestaurants();
  };

  const find = (query, by) => {
    RestaurantDataService.find(query, by)
      .then(response => {
        console.log(response.data);
        setRestaurants(response.data.restaurants);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByName = () => {
    find(searchName, "name")
  };

  const findByZip = () => {
    find(searchZip, "zipcode")
  };

  const findByCuisine = () => {
    if (searchCuisine == "All Cuisines") {
      refreshList();
    } else {
      find(searchCuisine, "cuisine")
    }
  };

  const classes = useStyles();


  return (
    <div>

      <div style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
      }}>
        <Paper component="form" className={classes.root} style={{ marginRight: "30px", width: "33%", backgroundColor: "azure" }}>
          <InputBase
            className={classes.input}
            placeholder="Search by Name"
            value={searchName}
            onChange={onChangeSearchName}
          />
          <IconButton type="submit" className={classes.iconButton} aria-label="search" type="button"
            onClick={findByName} style={{ alignItems: "end" }}>
            <SearchIcon />
          </IconButton>
        </Paper>


        <Paper component="form" className={classes.root} style={{ marginRight: "30px", width: "33%", backgroundColor: "azure" }}>
          <InputBase
            className={classes.input}
            placeholder="Search by zip"
            value={searchZip}
            onChange={onChangeSearchZip}
          />
          <IconButton type="submit" className={classes.iconButton} aria-label="search" type="button"
            onClick={findByZip}>
            <SearchIcon />
          </IconButton>


        </Paper>
        <FormControl className={classes.margin}>
          <InputLabel htmlFor="demo-customized-select-native" style={{ fontSize: "20px", fontVariant: "traditional" }}>Search By Cuisine</InputLabel>
          <NativeSelect onChange={onChangeSearchCuisine} type="button"
            onClick={findByCuisine} input={<BootstrapInput />} style={{ width: "400px", backgroundColor: "azure" }}>
            {cuisines.map(cuisine => {
              return (
                <option value={cuisine}> {cuisine.substr(0, 20)} </option>
              )
            })}
          </NativeSelect>
        </FormControl>
      </div>
      <br />


      <div className="row">
        {restaurants.map((restaurant) => {
          const address = `${restaurant.address.building} ${restaurant.address.street}, ${restaurant.address.zipcode}`;
          return (
            <div className="col-lg-4 ">
              <div className="card-body">
                <Card className={classes.root} style={{ backgroundColor: "lightsteelblue", height: "200px" }}>
                  <CardHeader
                    avatar={
                      <FastfoodOutlinedIcon fontSize="large" />
                    }
                  /> <br />
                  <p className="card-text">
                    <p style={{ fontFamily: 'Poppins', fontSize: "20px", fontWeight: "900" }}>{restaurant.name}</p>
                    <strong>Cuisine: </strong>{restaurant.cuisine}<br />
                    <strong>Address: </strong>{address}<br /><br />
                    <div className="row">

                      <Link to={"/restaurants/" + restaurant._id} className="btn btn-primary col-lg-5 mx-1 mb-1" style={{ backgroundColor: "yellowgreen", borderColor: "transparent"  }}>
                        <ChatBubbleOutlineSharpIcon />
                      </Link>

                      <a target="_blank" href={"https://www.google.com/maps/place/" + address} className="btn btn-primary col-lg-5 mx-1 mb-1" style={{ backgroundColor: "yellowgreen", borderColor: "transparent" }} >
                        <MapSharpIcon />
                      </a>
                    </div>
                  </p>
                </Card>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RestaurantsList;