/*
 * @Author: weisheng
 * @Date: 2023-12-14 11:21:58
 * @LastEditTime: 2024-01-03 21:46:58
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: /wot-design-uni/src/uni_modules/wot-design-uni/components/wd-form/types.ts
 * 记得注释
 */
import { type InjectionKey } from 'vue'

export type FormProvide = {
  props: {
    model: Record<string, any>
    rules?: FormRules
    border?: boolean
  }
  errorMessages?: Record<string, string>
}

export const FORM_KEY: InjectionKey<FormProvide> = Symbol('wd-form')

export type FormRules = {
  [key: string]: FormItemRule[]
}

export type ErrorMessage = {
  prop: string
  message: string
}

export interface FormItemRule {
  [key: string]: any
  required: boolean
  message: string
  pattern?: RegExp
  validator?: (value: any, rule: FormItemRuleWithoutValidator) => boolean | Promise<string> | Promise<boolean> | Promise<void> | Promise<unknown>
}

export type FormItemRuleWithoutValidator = Omit<FormItemRule, 'validator'>
