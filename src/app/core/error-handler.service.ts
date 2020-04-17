import { Injectable } from "@angular/core";
import { ToastyService } from "ng2-toasty";
import { HttpResponse, HttpErrorResponse } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ErrorHandlerService {

  constructor(private toastyService: ToastyService) { }

  handle(errorResponse: any) {
    let msg: string;
    if (typeof errorResponse === "string") {
      msg = errorResponse;
    } else if (errorResponse instanceof HttpErrorResponse && errorResponse.status >= 400 && errorResponse.status <= 499) {
      if (Array.isArray(errorResponse.error)) {
        errorResponse.error.forEach(obj => {
          try {
            if ("mensagemUsuario" in obj && obj.mensagemUsuario !== "") {
              msg = obj.mensagemUsuario;
            }
          } catch (error) {
            console.log("errorResponse #", error);
          }
        });
      } else {
        msg = "Ocorreu um erro ao processar a sua solicitação";
        console.log("errorResponse #", errorResponse);
      }
    } else {
      msg = "Erro ao processar serviço remoto. Tente novamente!";
      console.log("errorResponse #", errorResponse);
    }
    this.toastyService.error(msg);
  }

}
