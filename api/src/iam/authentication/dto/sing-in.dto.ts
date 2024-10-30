import { PartialType } from '@nestjs/mapped-types';
import { SingUpDto } from './sing-up.dto';

export class SingInDto extends PartialType(SingUpDto) {}
