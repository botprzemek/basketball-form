const Step = {
    START: 0,
    TEAM: 1,
    PLAYERS: 2,
    SUMMARY: 3,
    SENT: 4,
} as const;

interface Transition {
    next: Step | null;
    previous: Step | null;
}

const Transitions: Record<Step, Transition> = {
    [Step.START]: { next: Step.TEAM, previous: null },
    [Step.TEAM]: { next: Step.PLAYERS, previous: Step.START },
    [Step.PLAYERS]: { next: Step.SUMMARY, previous: Step.TEAM },
    [Step.SUMMARY]: { next: Step.SENT, previous: Step.PLAYERS },
    [Step.SENT]: { next: null, previous: null },
} as const;

type Step = (typeof Step)[keyof typeof Step];

const initAccepted = () => false;

const initCategory = () => null;

const initTeam = () => ({
    name: undefined,
    email: undefined,
    phone: undefined,
    city: undefined,
});

const initPlayers = () =>
    Array.from(
        { length: 4 },
        () =>
            ({
                firstName: undefined,
                lastName: undefined,
                age: undefined,
            }) satisfies Partial<PlayerPayload>,
    );

export default () => {
    const step = useState<Step>("basketball-form-step", () => Step.START);
    const accepted = useState<boolean>(
        "basketball-form-accepted",
        initAccepted,
    );
    const category = useState<Category | null>(
        "basketball-form-category",
        initCategory,
    );
    const team = useState<Partial<TeamPayload>>(
        "basketball-form-team",
        initTeam,
    );
    const players = useState<Array<Partial<PlayerPayload>>>(
        "basketball-form-players",
        initPlayers,
    );

    const currentTransition = computed(() => Transitions[step.value]);

    const canGoNext = computed(() => currentTransition.value.next !== null);
    const canGoBack = computed(() => currentTransition.value.previous !== null);

    const isStarted = computed(() => step.value === Step.START);
    const isSummarized = computed(() => step.value === Step.SUMMARY);
    const isSent = computed(() => step.value === Step.SENT);
    const isPending = useState<boolean>("basketball-form-pending", () => false);
    const isStepValid = useState<boolean>("basketball-form-valid", () => false);

    const set = (value: Step | null) => {
        if (value === null) {
            return;
        }

        isStepValid.value = false;
        step.value = value;
    };

    const reset = () => {
        accepted.value = initAccepted();
        category.value = initCategory();
        team.value = initTeam();
        players.value = initPlayers();

        set(Step.START);
    };

    const next = () => {
        if (!canGoNext.value) {
            return;
        }

        if (!canGoBack && !isStepValid.value) {
            return;
        }

        set(currentTransition.value.next);
    };

    const previous = () => {
        if (!canGoBack.value) {
            return;
        }

        set(currentTransition.value.previous);
    };

    const submit = async () => {
        if (isPending.value || !category.value || !isSummarized.value) {
            return;
        }

        isPending.value = true;

        await $fetch(`/api/form`, {
            method: "POST",
            body: {
                category: category.value,
                team: team.value,
                players: players.value,
            },
        });

        isPending.value = false;

        next();
    };

    return {
        Step,
        step,
        accepted,
        category,
        team,
        players,
        canGoNext,
        canGoBack,
        isStarted,
        isSummarized,
        isSent,
        isPending,
        isStepValid,
        set,
        reset,
        previous,
        next,
        submit,
    };
};
