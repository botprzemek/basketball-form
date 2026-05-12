interface Category {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt?: Date | null;
}

interface Team {
    id: string;
    name: string;
    categoryId: number;
    email: string;
    phone: string;
    createdAt: Date;
    verifiedAt?: Date | null;
    updatedAt?: Date | null;
};

interface Player {
    id: string;
    teamId: string;
    firstName: string;
    lastName: string;
    age: number;
    createdAt: Date;
    updatedAt: Date;
};

interface CategoryPayload {
    name: string;
};

interface TeamPayload {
    categoryId: number;
    name: string;
    email: string;
    phone: string;
    createdAt: Date;
    updatedAt?: Date | null;
};

interface PlayerPayload {
    teamId?: string | null;
    firstName: string;
    lastName: string;
    age: number;
};