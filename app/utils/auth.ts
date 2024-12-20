import jwt, { JsonWebTokenError, JwtPayload, TokenExpiredError } from "jsonwebtoken";
import config from "../config";


function sign(data: any) {
    return jwt.sign({ user: data }, config.jwt.jwt_secret as string, { expiresIn: config.jwt.jwt_expire });
}

function verify(token: string): { user: JwtPayload | null, error: JsonWebTokenError | TokenExpiredError | null } {
    try {
        const decoded = jwt.verify(token, config.jwt.jwt_secret as string);
        return {
            user: decoded as JwtPayload,
            error: null,
        }
    } catch (err) {
        return {
            user: null,
            error: err as JsonWebTokenError | TokenExpiredError | null
        }
    }
}

export {
    sign,
    verify
}