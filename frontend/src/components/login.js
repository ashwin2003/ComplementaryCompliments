import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
 
const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

const Login = props => {

  const initialUserState = {
    name: "",
    id: "",
  };

  const [user, setUser] = useState(initialUserState);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const login = () => {
    props.login(user)
    props.history.push('/');
  }

  const classes = useStyles();

  return (
    <div  >
      <div >
        <div className="submit-form" style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",  }}
       
        >
          <div>
            <div className="form-group"  >
              <TextField
                className="form-control"
                id="name"
                required
                value={user.name}
                onChange={handleInputChange}
                name="name"
                label="Enter Username"
                autoComplete="off"
                style={{ width: "90vw", maxWidth: "300px", marginBottom: "20px", marginTop: "20px" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              />
              <br />
            </div>


            <div className="form-group">
              <TextField
                type="text"
                className="form-control"
                id="id"
                required
                value={user.id}
                onChange={handleInputChange}
                name="id"
                label="ID"
                autoComplete="off"
                style={{ width: "90vw", maxWidth: "300px", marginBottom: "20px", marginTop: "20px" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            <Button variant="contained" onClick={login} className="btn btn-success" style={{ textDecoration: "none", color: "darkslategrey", fontFamily: "Roboto", fontSize: "20px", backgroundColor: "lightcyan" }}>
              Login
        </Button>
          </div> 
        </div>
      </div>
    </div >
  );
};

export default Login;