import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import background from "../src/background.jpg";
import AddReview from "./components/add-review";
import Restaurant from "./components/restaurants";
import RestaurantsList from "./components/restaurants-list";
import Login from "./components/login";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    color: "black"
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));



function App() {
  const [user, setUser] = React.useState(null);

  async function login(user = null) {
    setUser(user);
  }

  async function logout() {
    setUser(null);
  }


  const classes = useStyles();


  return (
    <div style={{ backgroundImage: `url(${background})`, height: "2000px", width: "100%" }}>
      <div>
        <div className={classes.root}>
          <AppBar position="static" style={{ backgroundColor: "skyblue" }}>
            <Toolbar>
              <Typography variant="h6" className={classes.title} >

                <a href="/restaurants" style={{ textDecoration: "none", color: "darkslategrey", fontFamily: "Roboto", fontSize: "25px", fontWeight: "bold" }} >
                  Complementary Compliments
             </a>
              </Typography>

              <div >
                {user ? (
                  <a onClick={logout}  >
                    <Button variant="contained" style={{ height: "38px", width: "140px", backgroundColor: "lightcyan" }}>
                      Logout {user.name}
                    </Button>
                  </a>
                ) : (
                  <Link to={"/login"} className="nav-link" style={{ textDecoration: "none", color: "darkslategrey", fontFamily: "Roboto", fontSize: "20px" }}>
                    <Button variant="contained" style={{ height: "35px", width: "90px", backgroundColor: "lightcyan" }}>
                      Login
                      </Button>
                  </Link>
                )}
              </div>
            </Toolbar>
          </AppBar>
        </div>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/restaurants"]} component={RestaurantsList} />
            <Route
              path="/restaurants/:id/review"
              render={(props) => (
                <AddReview {...props} user={user} />
              )}
            />
            <Route
              path="/restaurants/:id"
              render={(props) => (
                <Restaurant {...props} user={user} />
              )}
            />
            <Route
              path="/login"
              render={(props) => (
                <Login {...props} login={login} />
              )}
            />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;