import { Controller, Body, Get , Post } from '@nestjs/common';
import { AppService } from './app.service';
import {Identity} from './app.model';

@Controller()
export class AppController 
{
  constructor(private readonly appService: AppService) {}

  
  @Post('/identitycreate') 
  createIdentity(@Body() identity : Identity)
  {
      return this.appService.createIdentity(identity.recoveryAddress ,identity.providers, identity.resolvers);
  }
  
  
  @Get('/identity/ein')
  getIdentityByEIN(@Body('value') value: number) 
  {
    return this.appService.getIdentityByEIN(value);
  }



}
