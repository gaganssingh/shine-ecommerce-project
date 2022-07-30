import { IsString } from 'class-validator';

export class VerifyJwtDto {
  @IsString()
  jwt: string;
}
