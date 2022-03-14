import { hash } from 'bcrypt';
import { CreateProverDataDto, CreateCommitmentDto, CreateComputeDto } from '@/dtos/provers.dto';
import { HttpException } from '@exceptions/HttpException';
import { Prover, Range } from '@/interfaces/provers.interface';
import proverModel from '@models/prover.model';
import { isEmpty } from '@utils/util';
import ZkpUtils from '@utils/zkp';

class ProverService {
  public provers = proverModel;

  public async findAllProvers(): Promise<Prover[]> {
    const provers: Prover[] = this.provers;
    return provers;
  }

  public async findProverById(Id: number): Promise<Prover> {
    const proverData: Prover = this.provers.find(prover => prover.userId === Id);
    if (!proverData) throw new HttpException(409, "Provider not found");

    return proverData;
  }

  public async create_register_commits(createProverDataDto: CreateProverDataDto): Promise<Prover> {
    if (isEmpty(createProverDataDto)) throw new HttpException(400, "Empty Data not allowed");

    const zkpUtils = new ZkpUtils();
    zkpUtils.setupEnvWithDefaultConfig( 
      createProverDataDto.q, 
      createProverDataDto.g, 
      createProverDataDto.a, 
      createProverDataDto.b );

    const prover: Prover = {...createProverDataDto, zkpUtils};

    this.provers = [...this.provers, prover];

    return prover;
  }

  public async create_authentication_request(commitmentData: CreateCommitmentDto): Promise<Range> {
    const proverData: Prover = this.provers.find(prover => prover.userId === commitmentData.userId);
    if (!proverData) throw new HttpException(409, "Provider not found");

    if(proverData.zkpUtils == undefined || proverData.zkpUtils == null) 
      throw new HttpException(409, "Public environment is not defined");

    const range: Range = proverData.zkpUtils.Commitment(commitmentData.userId);

    return range;
  }

  public async prove_authentication(createComputeDto: CreateComputeDto): Promise<number> {
    const proverData: Prover = this.provers.find(prover => prover.userId === createComputeDto.userId);
    if (!proverData) throw new HttpException(409, "Provider not found");

    if(proverData.zkpUtils == undefined || proverData.zkpUtils == null) 
      throw new HttpException(409, "Public environment is not defined");

    const S: number = proverData.zkpUtils.Challenge(createComputeDto.c);

    return S;
  }
}

export default ProverService;
