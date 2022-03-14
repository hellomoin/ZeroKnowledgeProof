import { CreateChallengeDataDto, CreateResponseDataDto } from '@/dtos/verifiers.dto';
import { HttpException } from '@exceptions/HttpException';
import {Verifier} from '@/interfaces/verifiers.interface';
import VerifierModel from '@models/verifier.model';
import ZkpUtils from '@utils/zkp';
import {ZkpPublicData} from "@/interfaces/zkp.interface"
import {rand, getPrime} from "@utils/util";

class VerifierService {
  public verifiers = VerifierModel;

  constructor() {
  }

  public async findAllVerifiers(): Promise<Verifier[]> {
    const verifiers: Verifier[] = this.verifiers;
    return verifiers;
  }

  public async findVerifierById(userId: number): Promise<Verifier> {
    const verifierData: Verifier = this.verifiers.find(prover => prover.userId === userId);
    if (!verifierData) throw new HttpException(409, "Verifier not found");

    return verifierData;
  }

  public async register(userId: number): Promise<Verifier> {
    const verifierData: Verifier = this.verifiers.find(verifier => verifier.userId === userId);
    if (verifierData) {
      return verifierData
    }

    const zkpUtils = new ZkpUtils();

    const p = getPrime(1000, 2000);
    const zkpPublicData: ZkpPublicData = zkpUtils.setupEnvWithRandomNumbers(p);      
    let c = 0;
    let r1 = 0;
    let r2 = 0;
    const verifier: Verifier = {userId: userId, zkpPublicData, zkpUtils, c, r1, r2};

    this.verifiers = [...this.verifiers, verifier];

    return verifier;
  }

  public async create_authentication_challenge(createChallengeDataDto: CreateChallengeDataDto): Promise<number> {
    const verifierData: Verifier = this.verifiers.find(verifier => verifier.userId === createChallengeDataDto.userId);
    if (!verifierData) throw new HttpException(409, "prover not found");


    verifierData.r1 = createChallengeDataDto.r1;
    verifierData.r2 =  createChallengeDataDto.r2;
    verifierData.c =  rand(1, 100);

    return verifierData.c;
  }

  public async verify_authentication(createResponseDataDto: CreateResponseDataDto): Promise<boolean> {
    const verifierData: Verifier = this.verifiers.find(verifier => verifier.userId === createResponseDataDto.userId);
    if (!verifierData) throw new HttpException(409, "prover not found");

    const verified = verifierData.zkpUtils.Response(createResponseDataDto.S, 
                                                    verifierData.c, 
                                                    verifierData.r1, 
                                                    verifierData.r2);
    return verified;
  }

}

export default VerifierService;
