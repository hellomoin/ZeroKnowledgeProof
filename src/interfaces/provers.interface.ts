import ZkpUtils from '@utils/zkp';

export interface Prover {
  userId: number;  
  q: number;  
  g: number;
  a: number;
  b: number;
  zkpUtils: ZkpUtils;
}

export interface Range {
  r1: number;  
  r2: number;  
}

