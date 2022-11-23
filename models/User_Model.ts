export interface UserInfo {
    gender?: string,
    age?: number,
    weight?: number,
    height?: number,
}

export interface UserFood {
    allergy?: string[];
    avoid?: string[];
    disease?: string[];
    eatingType?: string[];
}

export interface UserAccount {
    uid: string,
    email: string,
    firstname: string,
    lastname: string,
    userFood?: UserFood,
    userInfo?: UserInfo
}