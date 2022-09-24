export const isEmptyArray = (arr: any[]) => arr.length === 0

export const isHTMLElement = <T = HTMLElement>(el: unknown): el is T => el instanceof HTMLElement
