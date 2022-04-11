export interface IJwtToken {
    iss: string
    iat: number
    exp: number
    nbf: number
    jti: string
    sub: string
    prv: string
}
