import {Injectable} from "@angular/core";
import sha256, {} from "fast-sha256";
import {UtilsService} from "@app/shared/services/utils.service";

@Injectable({
  providedIn: "root"
})
export class CryptoService {

  deferred: Promise<number>;
  data: string;
  counter: number = 0;

  constructor(private utilsService: UtilsService) {
  }

  init() {
  }

  getWebCrypto() {
    if (typeof window === "undefined" || !window.isSecureContext) {
      return;
    }
    return window.crypto.subtle;
  };

  calculateHash(hash: any, resolve: (result: number) => void) {
    hash = new Uint8Array(hash);
    if (hash[31] === 0) {
      resolve(this.counter);
    } else {
      this.counter += 1;
      this.work(resolve);
    }
  };

  work(resolve: (result: number) => void) {
    const webCrypto = this.getWebCrypto();
    const toHash = this.utilsService.str2Uint8Array(this.data + this.counter);
    let digestPremise;

    if (webCrypto) {
      digestPremise = webCrypto.digest({name: "SHA-256"}, toHash);
    } else {
      digestPremise = new Promise((resolve, reject) => {
        if (sha256(toHash)) {
          resolve("ok");
        } else {
          reject("error");
        }
      });
    }

    if (typeof digestPremise.then !== "undefined") {
      digestPremise.then(res => {
        this.calculateHash(res, resolve);
      });
    } else {
      digestPremise.then(res => {
        return res;
      });
    }

    return digestPremise;
  }

  proofOfWork(data: string): Promise<number> {

    this.deferred = new Promise((resolve, _) => {
      this.data = data;
      this.counter = 0;
      this.work(resolve);
    });

    return this.deferred;
  }

}
