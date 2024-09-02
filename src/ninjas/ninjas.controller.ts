import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjasService } from './ninjas.service';
import { BeltGuard } from 'src/belt/belt.guard';
import {
  ApiCreatedResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Ninja } from './entities/ninja.entity';

@ApiTags('Ninjas')
@Controller('ninjas')
@UseGuards(BeltGuard)
export class NinjasController {
  constructor(private readonly ninjaService: NinjasService) {}
  //GET /ninjas?weapon=stars--> []
  @ApiQuery({
    name: 'weapon',
    required: false,
    enum: ['stars', 'nunchucks'],
    description: 'Filter ninjas by weapon type',
  })
  @Get()
  getNinjas(@Query('weapon') weapon: 'stars' | 'nunchucks') {
    // const service = new NinjasService();
    return this.ninjaService.getNinjas(weapon);
  }
  //GET /ninjas/:id	 --> {...}
  @ApiParam({
    name: 'id',
    description: 'The ID of the ninja to retrieve',
    example: 1,
  })
  @Get(':id')
  getOneNinja(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.ninjaService.getOneNinja(id);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new NotFoundException();
    }
  }
  //POST /ninjas
  @ApiCreatedResponse({ type: Ninja })
  @Post()
  createNinja(@Body(new ValidationPipe()) createNinjaDto: CreateNinjaDto) {
    return this.ninjaService.createNinja(createNinjaDto);
  }
  //PUT /ninjas/:id --> {...}
  @Put(':id')
  updateNinja(@Param('id') id: string, @Body() updateNinjaDto: UpdateNinjaDto) {
    return this.ninjaService.updateNinja(+id, updateNinjaDto);
  }
  //DELETE /ninjas/:id
  @Delete(':id')
  removeNinja(@Param('id') id: string) {
    return this.ninjaService.removeNinja(+id);
  }
}
