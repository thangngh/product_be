import { IsNotEmpty, IsString } from 'class-validator';

export class JWTPayload {
    @IsString()
    @IsNotEmpty()
    public userId!: string;

    @IsString()
    @IsNotEmpty()
    public username!: string;
}
