import { Controller, Param, Body, Get, Post, Put, Delete, HttpCode, UseBefore } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { CreateProverDataDto, CreateCommitmentDto, CreateComputeDto } from '@/dtos/provers.dto';
import { Prover, Range } from '@/interfaces/provers.interface';

import ProverService from '@/services/provers.service';
import { validationMiddleware } from '@middlewares/validation.middleware';

@Controller()
export class ProversController {
  public proverService = new ProverService();

  @Get('/provers')
  @OpenAPI({ summary: 'Get all register users as provers' })
  async getUsers() {
    const prover: Prover[] = await this.proverService.findAllProvers();
    return { data: prover, message: 'get all provers' };
  }

  @Get('/provers/:userId')
  @OpenAPI({ summary: 'Return single user' })
  async getUserById(@Param('userId') userId: number) {
    const prover: Prover = await this.proverService.findProverById(userId);
    return { data: prover, message: 'findOne' };
  }

  @Post('/provers/create_register_commits')
  @HttpCode(201)
  @UseBefore(validationMiddleware(CreateProverDataDto, 'body'))
  @OpenAPI({ summary: 'create register commits' })
  async create_register_commits(@Body() proverData: CreateProverDataDto) {
    const createProver: Prover = await this.proverService.create_register_commits(proverData);
    return { data: createProver, message: 'created' };
  }

  @Post('/provers/create_authentication_request')
  @HttpCode(201)
  @UseBefore(validationMiddleware(CreateCommitmentDto, 'body'))
  @OpenAPI({ summary: 'create authentication requst' })
  async create_authentication_request(@Body() commitmentData: CreateCommitmentDto) {
    const range: Range = await this.proverService.create_authentication_request(commitmentData);
    return { data: range, message: 'created' };
  }

  @Post('/provers/prove_authentication')
  @HttpCode(201)
  @UseBefore(validationMiddleware(CreateComputeDto, 'body'))
  @OpenAPI({ summary: 'prove authentication' })
  async prove_authentication(@Body() computeDto: CreateComputeDto) {
    const S: number = await this.proverService.prove_authentication(computeDto);
    return { data: {'S': S}, message: 'created authentication request' };
  }
}
