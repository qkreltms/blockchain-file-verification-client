import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import FormGroup from "@material-ui/core/FormGroup";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import LoginDialog from "../common/loginDialog";

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

class MenuAppBar extends React.Component {
  state = {
    isLoggedIn: false,
    anchorEl: null,
    isOpen: false
  };

  setIsOpen = isOpen => {
    this.setState({ isOpen });
  }

  // handleChange = event => {
  //   this.setState({ auth: event.target.checked });
  // }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleClose = () => {
    this.setState({ anchorEl: null });
  }

  handleOnLogin = () => {
    this.setState({ isOpen: true });
  }

  handleOnSignUp = () => {
    //signup modal 창 나옴
  }

  render = () => {
    const { classes } = this.props;
    const { isLoggedIn, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        {this.state.isOpen ? (
          <LoginDialog setIsOpen={this.setIsOpen} isOpen={this.state.isOpen} />
        ) : (
          <div />
        )}
        <FormGroup />
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              <Link to="/">웹 제목</Link>
            </Typography>
            {isLoggedIn ? (
              <div>
                <IconButton
                  aria-owns={open ? "menu-appbar" : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose}>
                    {" "}
                    <Link to="/menu/profile">프로필</Link>
                  </MenuItem>
                </Menu>
              </div>
            ) : (
              <div>
                <Button onClick={this.handleOnSignUp}>회원가입</Button>
                <Button onClick={this.handleOnLogin}>로그인</Button>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MenuAppBar);
