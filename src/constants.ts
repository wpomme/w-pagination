export const displayLength = 7
export const buttonType = ["first", "previous", "next", "last", "number", "threePointLeader"] as const

export type ButtonType = typeof buttonType[number]

