export interface AccessAndRefreshTokens {
  access_token: string;
  refresh_token: string;
}

export function isAccessAndRefreshTokens(x: any): x is AccessAndRefreshTokens {
  return !!x.access_token && !!x.refresh_token;
}
