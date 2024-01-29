export enum EGender {
    MALE = 1,
    FEMALE = 0
}

export enum EActive {
    ACTIVE = 1,
    DE_ACTIVE = 0
}

export enum ERole {
    USER = "USER",
    CUSTOMER = "CUSTOMER",
    OWNER = "OWNER",
    ADMIN = "ADMIN"
}

export enum METHOD {
    GET = 'get',
    POST = 'post',
    DELETE = 'delete',
    PATCH = 'patch',
}

export enum SYSTEM_CODE {
    SUCCESS = 'SUCCESS',
    SORRY_SOMETHING_WENT_WRONG = 'SORRY_SOMETHING_WENT_WRONG',
    BAD_REQUEST = 'BAD_REQUEST',
    UNAUTHORIZED = 'UNAUTHORIZED',
    INVALID_TOKEN = 'INVALID_TOKEN',
    FORBIDDEN = 'FORBIDDEN',
    DATA_NOT_FOUND = 'DATA_NOT_FOUND',
    USER_NOT_FOUND = 'USER_NOT_FOUND',
    USERNAME_OR_PASSWORD_INVALID = 'USERNAME_OR_PASSWORD_INVALID',
    USER_ALREADY_EXISTS = "USER_ALREADY_EXISTS",
    EMAIL_ALREADY_EXISTS = "EMAIL_ALREADY_EXISTS",
    TOKEN_EXPIRED = "TOKEN_EXPIRED",
    ACCOUNT_LOCKED = "ACCOUNT_LOCKED"
}

export enum VALIDATE_MESSAGE {
    TO_LONG = 'To Long',
    REQUIRED = 'Required',
    NOT_MATCH = 'Not Match'
}


export const strongPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/g

export enum LANGUAGE {
    ENGLISH = 2,
    VIETNAMESE = 3,
}

export enum LANGUAGE_CODE {
    VIETNAMESE = 'vn',
    ENGLISH = 'en',
}

type LanguageCodeMapper = {
    [key in LANGUAGE_CODE]: LANGUAGE;
};

export const LanguageCodeMap: LanguageCodeMapper = {
    [LANGUAGE_CODE.VIETNAMESE]: LANGUAGE.VIETNAMESE,
    [LANGUAGE_CODE.ENGLISH]: LANGUAGE.ENGLISH,
};


export type TranslateDict<T> = {
    [k in keyof T]: {
        params: {
            [key: string]: unknown;
        };
    };
};