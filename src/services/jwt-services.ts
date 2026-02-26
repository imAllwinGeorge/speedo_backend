import jwt, { type SignOptions } from 'jsonwebtoken'

export class JwtServices {
  constructor(
    private readonly secret: string,
    private readonly refreshSecret: string,
  ) {}

  singnAccessToken(payload: object, expiresIn: SignOptions["expiresIn"] = '1h'): string {
    return jwt.sign(payload, this.secret, {expiresIn})
  }

  signRefreshToken(payload: object, expiresIn: SignOptions["expiresIn"] = "7d"): string {
    return jwt.sign(payload, this.refreshSecret, {expiresIn});
  }

  verifyAccessToken(token: string): any {
    return jwt.verify(token, this.secret)
  }

  verifyRefreshToken(token: string): any {
    return jwt.verify(token, this.refreshSecret)
  }

  decodeToken(token: string): any {
    return jwt.decode(token)
  }
}
