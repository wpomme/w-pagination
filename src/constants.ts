export const displayLength = 7
export const buttonType = ["first", "previous", "current", "next", "last", "number", "threePointLeader"] as const

export type ButtonType = typeof buttonType[number]

