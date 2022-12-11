export interface UserInfo {
    gender?: string,
    age?: number,
    weight?: number,
    height?: number,
    disease?: string[];
}

export interface UserFood {
    allergy?: string[];
    avoid?: string[];
    eatingType?: string[];
    foodType?: string[];
}

export interface UserAccount {
    uid: string,
    email: string,
    firstname: string,
    lastname: string,
    food?: UserFood,
    info?: UserInfo,
    like?: string[]
}