import {
    createParamDecorator,
    ExecutionContext,
    UnauthorizedException,
} from '@nestjs/common';
import { JWTPayload } from 'src/auth/jwt.payload';

interface IRequest<T extends JWTPayload> {
    user: T & { [key: string]: unknown };
}

function extractToken<T extends JWTPayload>(token: T): T | never {
    if (!token) {
        throw new UnauthorizedException();
    }
    return token;
}

export const authUser = createParamDecorator(
    <T extends JWTPayload>(_data: string, ctx: ExecutionContext): T => {
        const req = ctx.switchToHttp().getRequest<IRequest<T>>();
        return extractToken(req.user);
    },
);
