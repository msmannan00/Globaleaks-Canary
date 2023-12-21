export class ErrorCodes {
  message: string = "";
  arguments = [];
  code: number = -1;

  constructor(protected messageParam?: string,protected codeParam?: number,protected  argumentParam?: []) {
    if(argumentParam){
      this.arguments = argumentParam;
    }
    if(messageParam){
      this.message = messageParam;
    }
    if (codeParam) {
      this.code = codeParam;
    }
  }
}