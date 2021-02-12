import React from "react";
import { RouteComponentProps } from "react-router-dom";
import querystring from "query-string";
import { notify } from "react-notify-toast";

import { backend } from "../../adapter/backend";
import * as discord from "../../adapter/discord";

interface IState {
  access_token?: string;
}

interface IProps extends RouteComponentProps {
  setTitle?: (title: string) => void;
}

export class Login extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    console.log(this.props.location.search);
    this.query = querystring.parse(this.props.location.search);
    console.log(this.query);

    this.state = {
      access_token: backend.token.access || undefined,
    };
  }

  query: querystring.ParsedQuery;
  timeout?: NodeJS.Timeout;

  async login() {
    if (typeof this.query?.code == "string" && !backend.token.access) {
      try {
        console.log("code");
        await backend.exchangeDiscordCode(this.query.code, "CODE");
        if (backend.token?.access) {
          this.setState({ access_token: backend.token.access });
          notify.show("You are logged in!", "success");
        }

        // let res = await fetch(
        //   `http://localhost:9000/discord/access_token?code=${this.query.code}`
        // );

        // let body = await res.json();
        // if (body?.access_token) {
        //   this.setState({ access_token: body.access_token });
        //   localStorage.setItem("access_token", body.access_token);
        //   localStorage.setItem("refresh_token", body.refresh_token);
        //   this.props.history.goBack();
        // }
      } catch (err) {
        console.error(err);
        this.setState({ access_token: "error" });
      }
    }
  }

  componentDidMount() {
    if (this.props.setTitle) this.props.setTitle("Login");

    if (backend.token.access && !this.query.code) {
      notify.show("You are already logged-in.", "warning", 2000);
      this.timeout = setTimeout(() => {
        this.props.history.goBack();
      }, 3000);
    } else {
      this.login();
    }
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  render() {
    // this.query.read
    return (
      <React.Fragment>
        <div>
          <a href={discord.oauth_url}>Log in with discord</a>
        </div>
        <div>access_token: {this.state.access_token}</div>
      </React.Fragment>
    );
  }
}

export default Login;
