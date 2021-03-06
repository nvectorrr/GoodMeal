export interface User {
    enabled :               boolean;
    authorities :           Authority[];
    accountNonExpired :     boolean;
    accountNonLocked :      boolean;
    credentialsNonExpired : boolean;
    username :              string;
    password :              string;
}

export interface Authority {
    authority : string;
}

export interface UserInfo {
    name:    string;
    surname: string;
    login:   string;
    email:   string;
    bday:    Date;
    roles:   string[];
}

export interface Users {
    data:  UsersDatum[];
    links: DatumLinks;
}

export interface UsersDatum {
    id:            string;
    type:          string;
    links:         DatumLinks;
    attributes:    Attributes;
    relationships: Relationships;
}

export interface Attributes {
    login:   string;
    name:    string;
    surname: string;
    email:   string;
    bday:    Date;
}

export interface DatumLinks {
    self: string;
}

export interface Relationships {
    selectionSet: Set;
    roleSet:      Set;
}

export interface Set {
    data:  RoleSetDatum[];
    links: RoleSetLinks;
}

export interface RoleSetDatum {
    id:   string;
    type: string;
}

export interface RoleSetLinks {
    self:    string;
    related: string;
}