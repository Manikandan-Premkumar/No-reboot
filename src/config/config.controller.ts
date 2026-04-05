import { Controller, Get, Post, Put, Body, Param, UseGuards, Request, Delete, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from './config.service';

@Controller('api/v1/config')
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}

 

  @Get()
  async findAll(@Query('scope') scope?: string) {
    return this.configService.findAll(scope);
  }

  @Get(':key')
  async findOne(@Param('key') key: string) {
    return this.configService.findOne(key);
  }

  @Get(':key/value')
  async getValue(@Param('key') key: string) {
    const value = await this.configService.getValue(key);
    return { key, value };
  }

 @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() body: any, @Request() req) {
    console.log('User:', req.user); // { username: 'admin', role: 'admin' }
    return this.configService.create(body);
  }

  @Put(':key')
  @UseGuards(AuthGuard('jwt'))
  async update(@Param('key') key: string, @Body() body: any) {
    return this.configService.update(key, body);
  }

  @Delete(':key')
  async delete(@Param('key') key: string) {
    await this.configService.delete(key);
    return { message: `Config "${key}" deleted` };
  }
}