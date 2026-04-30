interface CategoryRow {
    id: string;
    name: string;
}

interface TeamRow {
    id: string;
    category_id: number;
    name: string;
    email: string;
    phone: string;
    created_at: Date;
    verified_at?: Date;
}

interface PlayerRow {
    id: string;
    team_id: string;
    first_name: string;
    last_name: string;
    age: number;
    created_at: Date;
}

interface Player {
    firstName: string;
    lastName: string;
    age: number;
}

interface Team {
    name: string;
    category: Category;
    email: string;
    phone: string;
    players: Array<Player>;
}

type TeamDetailed = Team & {
    id: string;
    createdAt: Date;
    verifiedAt?: Date;
};

interface Link {
    href: string;
    type: string;
    rel: string;
    sizes?: string;
    media?: string;
}
