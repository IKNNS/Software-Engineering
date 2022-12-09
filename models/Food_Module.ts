export interface Food {
    englishName: string;
    foodEnergy: number;
    foodIngredient: string[];
    foodType: string[];
    imgURL: string;
    thaiName: string;
}

export interface FoodHistory extends Food {
    _id?: string;
    datetime: string;
}