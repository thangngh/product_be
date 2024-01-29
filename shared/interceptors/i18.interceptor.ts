import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { Observable } from 'rxjs';

@Injectable()
export class I18nInterceptor implements NestInterceptor {
    constructor(private readonly i18nService: I18nService) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();

        // Extract the language from the request (you can customize this logic based on your requirements)
        const lang = request.query.lang || request.headers['x-lang'];
        console.log("lang", request.headers['x-lang'])
        // Set the language for the current request
        // this.i18nService.setLanguage(lang);

        return next.handle();
    }
}
