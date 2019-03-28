import React from "react";
import {
  createStyles,
  Dialog,
  DialogTitle,
  FormLabel,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Input,
  DialogContent,
  InputAdornment,
  IconButton
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import classNames from "classnames";
import axios from "axios";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import config from "../../config";

const styles = theme =>
  createStyles({
    button: {
      margin: theme.spacing.unit
    },
    margin: {
      margin: theme.spacing.unit
    },
    textField: {
      flexBasis: 200
    }
  });

class LoginDialog extends React.Component {
  state = {
    passwordVisibility: false,
    password: "",
    email: "",
    isPasswordError: false,
    isEmailError: false,
    isLoggedIn: false,
    isEmailDuplicated: false
  };

  handleOnClose = () => {
    this.props.setIsOpen(false);
    this.setState({ password: "", email: "" });
  };

  handleEmailChange = event => {
    const email = event.target.value;
    this.setState({ isEmailError: this.isEmailOk(email) });
    this.setState({ email });
  };

  isEmailOk = email => {
    const emailRegex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

    if (email.length <= 0) return false;
    if (emailRegex.test(email)) return false;
    return true;
  };

  handlePasswordChange = event => {
    const password = event.target.value;
    this.setState({ isPasswordError: this.isPasswordOk(password) });
    this.setState({ password });
  };

  isPasswordOk = password => {
    if (password.length >= 1 && password.length >= 15) return true;
    return false;
  };

  handlePasswordVisibilityChange = event => {
    this.setState({ passwordVisibility: !this.state.passwordVisibility });
  };

  handleOnLogin = () => {
    const email = this.state.email;
    const password = this.state.password;

    if (email.length <= 0) return;
    if (password.length <= 0) return;

    const body = {
      email,
      password
    };

    axios
    .post(`${config.REACT_APP_SERVER_URL}/login`, body)
    .then(res => {
        this.setState({
            password: "",
            email: "",
        })
        this.props.setIsOpen(false);
        // TODO
        // this.props.setUser(res.data.message)
        // this.props.setIsLoggedIn(true);
        console.log("로그인 성공: ", res)
    })
    .catch(err => {
        //패스워드 혹은 이메일 틀림
        const res = err.response;
        console.log("로그인 실패: ", res);
    })
  };

  render = () => {
    const { classes, isOpen } = this.props;
    return (
      <Dialog
        open={isOpen}
        onClose={this.handleOnClose}
        aria-labelledby="login-dialog-slide-title"
        aria-describedby="login-dialog-slide-description"
        disableBackdropClick={true}
        keepMounted
      >
        <DialogTitle id="login-dialog-slide-title">로그인</DialogTitle>
        <DialogContent>
          {/* 이메일 */}
          <FormControl
            className={classNames(classes.margin, classes.textField)}
          >
            <InputLabel
              error={this.state.isEmailError}
              htmlFor="adornment-email"
            >
              이메일
            </InputLabel>
            <Input
              name="email"
              error={this.state.isEmailError}
              id={`adornment-email`}
              type="text"
              value={this.state.email}
              onChange={this.handleEmailChange}
            />
          </FormControl>

          {/* 비밀번호 */}
          <FormControl
            className={classNames(classes.margin, classes.textField)}
          >
            <InputLabel
              error={this.state.isPasswordError}
              htmlFor="adornment-password"
            >
              비밀번호
            </InputLabel>
            <Input
              name="password"
              error={this.state.isPasswordError}
              id="adornment-password"
              type={this.state.passwordVisibility ? "text" : "password"}
              value={this.state.password}
              onChange={this.handlePasswordChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={this.handlePasswordVisibilityChange}
                  >
                    {this.state.passwordVisibility ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          <FormLabel>
            {this.state.isPasswordError ? (
              "비밀번호는 1~15 자리 이내여야 합니니다."
            ) : this.state.isEmailError ? (
              "이메일 형식이 맞는지 확인해 주세요."
            ) : (
              <div />
            )}
          </FormLabel>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleOnClose} color="primary">
            취소
          </Button>
          <Button onClick={this.handleOnLogin} color="primary">
            확인
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
}

LoginDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func
};

export default withStyles(styles)(LoginDialog);
