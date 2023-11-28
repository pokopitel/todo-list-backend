import { ApiProperty } from '@nestjs/swagger';

export class SearchQueryDTO {
  @ApiProperty()
  offset: string;

  @ApiProperty()
  limit: string;
}
