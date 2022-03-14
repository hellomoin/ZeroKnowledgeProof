import { Controller, Param, Body, Get, Post, Put, Delete, HttpCode, UseBefore } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { CreateChallengeDataDto, CreateResponseDataDto } from '@/dtos/verifiers.dto';
import { Verifier} from '@/interfaces/verifiers.interface';
import VerifierService from '@/services/verifiers.service';
import { validationMiddleware } from '@middlewares/validation.middleware';

@Controller()
export class VerifiersController {
  public verifierService = new VerifierService();

  @Get('/verifiers')
  @OpenAPI({ summary: 'Get all verifiers' })
  async getUsers() {
    const prover: Verifier[] = await this.verifierService.findAllVerifiers();
    return { data: prover, message: 'get all provers' };
  }
  
  @Get('/verifiers/:userId')
  @OpenAPI({ summary: 'Return single user' })
  async getUserById(@Param('userId') userId: number) {
    const verifier: Verifier = await this.verifierService.findVerifierById(userId);
    return { data: verifier, message: 'findOne' };
  }

  @Get('/verifiers/register/:userId')
  @OpenAPI({ summary: 'Register user for verification' })
  async register(@Param('userId') userId: number) {
    const verifier: Verifier = await this.verifierService.register(userId);    
    return { data: {'userId': userId, 'publicData':verifier.zkpPublicData}, message: 'get current public environment' };
  }

  @Post('/verifiers/create_authentication_challenge')
  @UseBefore(validationMiddleware(CreateChallengeDataDto, 'body', true))
  @OpenAPI({ summary: 'create an authentication challenge' })
  async create_authentication_challenge(@Body() createChallengeDataDto: CreateChallengeDataDto) {
    const c: number = await this.verifierService.create_authentication_challenge(createChallengeDataDto);    
    return { data: {'c': c}, message: 'get challenge' };
  }

  @Post('/verifiers/verify_authentication')
  @UseBefore(validationMiddleware(CreateResponseDataDto, 'body', true))
  @OpenAPI({ summary: 'verify authentication' })
    async verify_authentication(@Body() createResponseDataDto: CreateResponseDataDto) {
    const verified: boolean = await this.verifierService.verify_authentication(createResponseDataDto);    
    return { data: verified, message: 'get authentication response' };
  }
}
