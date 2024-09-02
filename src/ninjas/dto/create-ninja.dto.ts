import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, MinLength } from 'class-validator';

export class CreateNinjaDto {
  @ApiProperty({
    description: 'The name of the ninja',
    minLength: 3,
    example: 'Naruto',
  })
  @MinLength(3)
  name: string;

  @ApiProperty({
    description: 'The weapon of the ninja',
    enum: ['stars', 'nunchucks'],
    example: 'stars',
  })
  @IsEnum(['stars', 'nunchucks'], { message: 'Use the correct Weapon!' })
  weapon: 'stars' | 'nunchucks';
}
