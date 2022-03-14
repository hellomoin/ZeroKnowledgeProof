import {ZkpPublicData} from "@/interfaces/zkp.interface"
import ZkpUtils from "@utils/zkp";
import {rand, getPrime} from "@utils/util";

//import ZkpUtils2 from "@utils/zkp2";

function sum(a, b) {
  return a + b;
}

describe('Test Prover/Verifier Service', () => {
  describe('Chaum-Pedersen Protocol', () => {
    test('Varify with default values', () => {
      const q = 10009;
      const g = 4;
      const a = 10;
      const b = 12;
      const x = 34;
      const c = 300;

      const zkpUtils = new ZkpUtils();

      const zkpPublicData: ZkpPublicData = zkpUtils.setupEnvWithDefaultConfig(q, g, a, b);
      console.log(`setup: {q, g, a, b}: {${zkpPublicData.q},${zkpPublicData.g}, ${zkpPublicData.a}, ${zkpPublicData.b}}`);

      const {r1, r2} = zkpUtils.Commitment(x);
      console.log(`commitment: {x, r1,r2}: {${x}, ${r1},${r2}}`);

      expect(r1).toBe(3131);
      expect(r2).toBe(676);

      const S = zkpUtils.Challenge(c);
      console.log(`challenge {c, S}: {${c}, ${S}}`);

      expect(S).toBe(3034);

      const verified = zkpUtils.Response(S, c, r1, r2);
      console.log(`response verified: {${verified}`);

      expect(verified).toBe(true);
    });

    test('Varify with random values', () => {
      const zkpUtils = new ZkpUtils();

      const p = getPrime(1000, 2000);
      const zkpPublicData: ZkpPublicData = zkpUtils.setupEnvWithRandomNumbers(p);      
      console.log(`setup: {q, g, a, b}: {${zkpPublicData.q},${zkpPublicData.g}, ${zkpPublicData.a}, ${zkpPublicData.b}}`);

      const x = rand(1, 100);
      const {r1, r2} = zkpUtils.Commitment(x);
      console.log(`commitment: {x, r1,r2}: {${x}, ${r1},${r2}}`);

      const c = rand(1, 100);
      const S = zkpUtils.Challenge(c);
      console.log(`challenge {c, S}: {${c}, ${S}}`);

      const verified = zkpUtils.Response(S, c, r1, r2);
      console.log(`response verified: {${verified}}`);

      expect(verified).toBe(true);
    });
  });
});


