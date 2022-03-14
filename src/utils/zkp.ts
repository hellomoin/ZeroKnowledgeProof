/**
 * @method 
 * @param 
 * @returns 
 * @description 
 */

import {ZkpPublicData} from "@/interfaces/zkp.interface"
import {rand} from "@utils/util"

class ZkpUtils {
    public zkpPublicData: ZkpPublicData;

    private k: number;       // Random Number for commitment step

    private productOfab: number;   // generated from a * b

    // Internal Functions generated based on known 'g' value
    private A: number;
    private B: number;
    private C: number;

//    public Gq: Array<number>;
    private randg: number;
    private randa: number;
    private randb: number;

    
    constructor() {
    }

    public setupEnvWithDefaultConfig(q: number, g: number, a: number, b: number) : ZkpPublicData {
        this.zkpPublicData = {q, g, a, b};

        this.productOfab = this.zkpPublicData.a * this.zkpPublicData.b;
        
        this.A = this.generateValue(this.zkpPublicData.g, this.zkpPublicData.a);
        this.B = this.generateValue(this.zkpPublicData.g, this.zkpPublicData.b);
        this.C = this.generateValue(this.zkpPublicData.g, this.productOfab);

        return this.zkpPublicData;
    } 


    public setupEnvWithRandomNumbers(p: number): ZkpPublicData {
        const minRange =  1;
        const maxRange =  p > 100 ? 100 : p - 1; // big numbers creating issues at a moment

        const q = p > 0 ? p : 1;
        const g = rand(minRange, maxRange);
        const a = rand(minRange, maxRange);
        const b = rand(minRange, maxRange);

        const zkpPublicData = this.setupEnvWithDefaultConfig(q, g, a, b);

        return zkpPublicData;
    } 

    private generateValue(n: number, k: number): number {
        return Number(((BigInt(n) ** BigInt(k)) % BigInt(this.zkpPublicData.q)));
    }

    private generateResponse(c: number): number {
        return ((this.k + (this.zkpPublicData.a * c)) % this.zkpPublicData.q);
    }

    public Commitment(k: number): {r1: number, r2: number} {
        let r1 = 0;
        let r2 = 0;
    
        this.k = k; // store k to generate response

        r1 = this.generateValue(this.zkpPublicData.g, k);
        r2 = this.generateValue(this.B, k);
        return {r1, r2};
    }

    public Challenge(c: number): number {
        let S = 0;
    
        S = this.generateResponse(c);
        return S;
    }

    public Response(S: number, c: number, r1: number, r2: number): boolean {
        const left1 = this.generateValue(this.zkpPublicData.g, S);
        const right1 = Number(((BigInt(this.A) ** BigInt(c)) * BigInt(r1)) % BigInt(this.zkpPublicData.q));
    
        if(left1 != right1) {
            return false;
        }
    
        const left2 = this.generateValue(this.B, S);
        const right2 = Number(((BigInt(this.C) ** BigInt(c)) * BigInt(r2)) % BigInt(this.zkpPublicData.q));
    
        if(left2 != right2) {
            return false;
        }

    return true;
    }    
}

/*
export const systemSetup = (): ZkpDefault => {
    
    const s = 5;
    console.log(`Gq: ${Gq.length}, randg: ${randg}, randa: ${randa}, randb: ${randb}`);
    console.log(`g: ${g}, a,A: {${a},${A}}, b,B: {${b},${B}}, c,C: ${c}, ${C}}`);
    const {y1, y2} = generateVerifier(x);
    console.log(`generated {y1,y2}: {${y1},${y2}}`);
    let z = challenge(s);

    if(verifyProof(z, s, y1, y2)) {
        console.log("verified");
    } else {
        console.log("failed");
    }

return {q, A, B, C};
};
*/   

export default ZkpUtils;