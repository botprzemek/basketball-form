enum Category {
    NOT_SELECTED,
    AMATEUR,
    PRO,
}

enum Stage {
    START,
    TEAM,
    PLAYERS,
    SUMMARY,
    SENT,
}

type Flatten<Type> = Type extends Array<infer Inner> ? Flatten<Inner> : Type;

type Nested<Origin, Type> = {
    [Property in keyof Origin]: Origin[Property] extends object
        ? Nested<Origin[Property], Type>
        : Type;
};

type Team = {
    name: string;
    category: Category;
    email: string;
    phone?: string;
};

type Player = {
    first_name: string;
    last_name: string;
    age?: number;
};

type Data = {
    team: Team;
    players: Player[];
    accepted: boolean;
};

type Errors = Nested<Data, boolean>;

type Patterns = {
    [Property in keyof Origin]: Origin[Property] extends object
        ? Nested<Flatten<Origin[Property]>, Type>
        : Type;
};

type Link = {
    href: string;
    type: string;
    rel: string;
    sizes?: string;
    media?: string;
};
