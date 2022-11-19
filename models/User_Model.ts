export interface UserInfo {
    gender?: string,
    age?: number,
    weight?: number,
    height?: number,
}

export interface UserAccount {
    uid: string,
    email: string,
    firstname: string,
    lastname: string,
    info?: UserInfo
}