interface Category {
    id: string;
    name: string;
    teamsLimit: number;
    teamsCount: number;
    teamsRemaining: number;
    isFull: boolean;
    createdAt: Date;
    updatedAt: Date | null;
}

interface Team {
    id: string;
    categoryId: number;
    name: string;
    email: string;
    phone: string;
    city: string;
    createdAt: Date;
    updatedAt: Date | null;
}

interface Player {
    id: string;
    teamId: string;
    firstName: string;
    lastName: string;
    age: number;
    createdAt: Date;
    updatedAt: Date | null;
}

interface TeamPayload {
    name: string;
    email: string;
    phone: string;
    city: string;
}

interface PlayerPayload {
    firstName: string;
    lastName: string;
    age: number;
}

interface FormPayload {
    category: Category;
    team: TeamPayload;
    players: Array<PlayerPayload>;
}
