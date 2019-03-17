import { IncomingMessage } from 'http';
import { Controller, UseGuards,  HttpService, Get, Post, Put, Delete, Req, Body, BadRequestException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';

import { resolveRoute } from './proxy.utils';

@UseGuards(AuthGuard('jwt'))
@Controller('api')
export class ProxyController {
  constructor(
    private readonly httpService: HttpService,
    private readonly jwtService: JwtService,
    ) { }

  @Get('*')
  async get(@Req() request: IncomingMessage) {
    try {
      const url = resolveRoute(request.url);
      const jwt = request.headers.authorization.replace('Bearer ', '');
      const jwtData: any = this.jwtService.decode(jwt);
      const username = jwtData.username;
      const response = await this.httpService.get(url, { headers: { username } }).toPromise();
      return response.data;
    } catch (error) {
      throw new BadRequestException(error.response.data);
    }
  }

  @Post('*')
  async post(@Req() request: IncomingMessage, @Body() body) {
    try {
      const url = resolveRoute(request.url);
      const jwt = request.headers.authorization.replace('Bearer ', '');
      const jwtData: any = this.jwtService.decode(jwt);
      const username = jwtData.username;
      const response = await this.httpService.post(url, body, { headers: { username } }).toPromise();
      return response.data;
    } catch (error) {
      throw new BadRequestException(error.response.data);
    }
  }
}
