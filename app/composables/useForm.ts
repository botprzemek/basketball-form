const Category = {
    NOT_SELECTED: 0,
    AMATEUR: 1,
    PRO: 2,
} as const;

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

type Category = (typeof Category)[keyof typeof Category];

type Step = (typeof Step)[keyof typeof Step];

interface Data {
    step: Step;
    team: Team;
    accepted: boolean;
}

const initData = () =>
    ({
        step: Step.START,
        team: {
            name: "",
            category: Category.NOT_SELECTED,
            email: "",
            phone: "",
            players: Array.from({ length: 4 }, () => ({
                firstName: "",
                lastName: "",
                age: 0,
            })),
        },
        accepted: false,
    }) satisfies Data;

export default () => {
    const data = useState<Data>("basketball-data", initData);
    const currentTransition = computed(() => Transitions[data.value.step]);

    const canGoNext = computed(() => currentTransition.value.next !== null);
    const canGoBack = computed(() => currentTransition.value.previous !== null);

    const isStarted = computed(() => data.value.step === Step.START);
    const isSummarized = computed(() => data.value.step === Step.SUMMARY);
    const isSent = computed(() => data.value.step === Step.SENT);
    const isPending = useState<boolean>("basketball-form-pending", () => false);

    const set = (step: Step | null) => {
        if (step === null) {
            return;
        }

        data.value.step = step;
    };

    const reset = () => {
        data.value = initData();
    };

    const next = () => {
        if (!canGoNext.value) {
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
        if (!isSummarized.value) {
            return;
        }

        isPending.value = true;

        await new Promise((resolve) => setTimeout(resolve, 2000));

        // await $fetch('/api/form', { method: 'POST', body: data.value });

        isPending.value = false;

        next();
    };

    return {
        Category,
        Step,
        data,
        canGoNext,
        canGoBack,
        isStarted,
        isSummarized,
        isSent,
        isPending,
        reset,
        previous,
        next,
        submit,
    };
};
