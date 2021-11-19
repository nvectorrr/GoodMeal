export interface Dishes {
    data :  Datum[];
    links : DatumLinks;
}

export interface Datum {
    id :            number;
    type :          Type;
    links :         DatumLinks;
    attributes :    Attributes;
    relationships : Relationships;
}

export interface Attributes {
    type : string;
}

export interface DatumLinks {
    self : string;
}

export interface Relationships {
    recipes : Recipes;
}

export interface Recipes {
    links : RecipesLinks;
}

export interface RecipesLinks {
    self :    string;
    related : string;
}

export enum Type {
    Dish = "dish",
}

export class ConvertDishes {
    public static toDishes(json : string) : Dishes {
        return JSON.parse(json);
    }

    public static dishesToJson(value : Dishes) : string {
        return JSON.stringify(value);
    }
}