export class errorCodes {
  message:string = ""
  code:number = -1
  arguments:[]

  constructor(messageParam?:any, codeParam?:any, argumentParam?:any) {
    this.message = messageParam
    this.code = codeParam
    this.arguments = argumentParam
  }
}

