export class errorCodes {
  message: string = "";
  arguments = [];
  code: number = -1;

  constructor(messageParam?: any, codeParam?: any, argumentParam?: any) {
    this.message = messageParam;
    this.arguments = argumentParam;
    if (codeParam) {
      this.code = codeParam;
    }
  }
}

