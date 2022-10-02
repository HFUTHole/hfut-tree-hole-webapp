export const isEmptyArray = (arr: any[]) => arr.length === 0

export const isHTMLElement = <T = HTMLElement>(el: unknown): el is T => el instanceof HTMLElement

export const isUndefined = (value: any): value is undefined => typeof value === 'undefined'

export const isEmptyObject = (value: any): value is object => typeof value === 'object' && Object.keys(value).length === 0
