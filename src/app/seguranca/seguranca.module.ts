import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginFormComponent } from "./login-form/login-form.component";
import { SegurancaRoutingModule } from "./seguranca-routing.module";
import { FormsModule } from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import { JwtHelperService, JwtModule } from "@auth0/angular-jwt";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { MoneyHttpInterceptorService } from "./money-http-interceptor.service";
import { AuthGuard } from "./auth.guard";


export function tokenGetter(): string {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [LoginFormComponent],
  imports: [
    CommonModule,
    SegurancaRoutingModule,
    InputTextModule,
    ButtonModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ["localhost:8080"],
        blacklistedRoutes: ["http://localhost:8080/oauth/token"]
      }
    }),
    FormsModule
  ],
  providers: [
    JwtHelperService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MoneyHttpInterceptorService,
      multi: true
    },
    AuthGuard
  ]
})

export class SegurancaModule { }
