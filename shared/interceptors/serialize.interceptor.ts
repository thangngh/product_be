import {
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    UseInterceptors,
} from '@nestjs/common';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class SerializeInterceptor<T> implements NestInterceptor {
    constructor(private dto: ClassConstructor<T>) { }
    intercept(context: ExecutionContext, next: CallHandler): Observable<T> {
        // console.log("dto", this.dto)
        return next.handle().pipe(
            map((data: T) => {
                // console.log("data", data, this.dto)
                return plainToClass(this.dto, data, {
                    excludeExtraneousValues: true,
                });

                // return data
            }),
        );
    }
}