import * as argon2 from "argon2";


export async function hashValue(value: string) {
    const hash = await argon2.hash(value)

    return hash
}

export async function validateHash(hashValue: string, value: string): Promise<boolean> {
    const isMatch = await argon2.verify(hashValue, value);
    return isMatch;
}