import Schema, { Rules, Values } from "async-validator";

export interface ValidateData<T> {
    data: T;
    error: string | null;
}

/**
 * 参数校验
 * @param ctx 上下文
 * @param rules 校验规则
 * @returns 校验结果
 */
export async function validateParam<T extends Values>(data: T, rules: Rules): Promise<ValidateData<T>> {
    const validator = new Schema(rules);
    return await validator.validate(data).then(() => ({
        data,
        error: null

    })).catch(err => ({
        data,
        error: err.errors[0].message
    }))
}