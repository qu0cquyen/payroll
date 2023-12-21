enum TOKEN {
  ACCESS_TOKEN = "access_token",
  REFRESH_TOKEN = "refresh_token",
}

export class LocalStorage {
  static setAccessToken(token: string) {
    if (typeof window === "undefined") return null;

    localStorage.setItem(TOKEN.ACCESS_TOKEN, token);
  }

  static getAccessToken() {
    if (typeof window === "undefined") return null;

    return localStorage.getItem(TOKEN.ACCESS_TOKEN);
  }

  static removeAccessToken() {
    if (typeof window === "undefined") return null;

    return localStorage.removeItem(TOKEN.ACCESS_TOKEN);
  }

  static setRefreshToken(token: string) {
    if (typeof window === "undefined") return null;

    localStorage.setItem(TOKEN.REFRESH_TOKEN, token);
  }

  static getRefreshToken() {
    if (typeof window === "undefined") return null;

    return localStorage.getItem(TOKEN.REFRESH_TOKEN);
  }

  static removeRefreshToken() {
    if (typeof window === "undefined") return null;

    return localStorage.removeItem(TOKEN.REFRESH_TOKEN);
  }
}
