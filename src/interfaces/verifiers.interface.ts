import { ZkpPublicData } from '@interfaces/zkp.interface';
import ZkpUtils from '@utils/zkp';

export interface Verifier {
  userId: number;  
  zkpPublicData: ZkpPublicData;
  zkpUtils: ZkpUtils;
  r1: number;
  r2: number;
  c: number;
}
