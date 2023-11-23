import { ApiProperty } from '@nestjs/swagger';

export class TodoDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  isCheked: boolean;

  @ApiProperty()
  createdAt: Date;
}
