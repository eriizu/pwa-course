import axios, { AxiosInstance } from "axios";
import * as ResponseType from "./ResponseType";

class BackendAdapter {
  url: string = "https://pwa-back.eriizu.fr";
  token: { access?: string | null; refresh?: string | null };

  constructor() {
    this.token = {};
  }

  get rq() {
    return axios.create({
      baseURL: this.url,
      headers: { ...this.authHeader },
    });
  }

  get authHeader() {
    if (this.token.access) {
      return { Authorization: `bearer ${this.token.access}` };
    } else {
      return {};
    }
  }

  async exchangeDiscordCode(code: string, type: "CODE" | "REFRESH") {
    try {
      let query = type === "CODE" ? `?code=${code}` : `?refresh_token=${code}`;
      let response = (await this.rq.get(`/discord/access_token${query}`)).data;
      if (ResponseType.isAccessAndRefreshTokens(response)) {
        localStorage.setItem("access_token", response.access_token);
        localStorage.setItem("refresh_token", response.refresh_token);
        this.token.access = response.access_token;
        this.token.refresh = response.refresh_token;
        return;
      }
    } catch (err) {
      console.error(err);
      throw new Error("E_CRED_EXCHANGE");
      // notify.show(
      //   "Failed to exchange credentials. You may try to login again.",
      //   "error",
      //   5000
      // );
      // throw new Error("E_CRED_EXCHANGE");
    }
  }

  async refreshDiscordToken() {
    if (this.token.refresh)
      return this.exchangeDiscordCode(this.token.refresh, "REFRESH");
    else throw new Error("E_NO_REFRESH_TOKEN");
  }
}

export const backend = new BackendAdapter();
