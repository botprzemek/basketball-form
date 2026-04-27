enum Category {
    NOT_SELECTED = 0,
    AMATEUR = 1,
    PRO = 2,
}

enum Stage {
    START = 0,
    TEAM = 1,
    PLAYERS = 2,
    SUMMARY = 3,
    SENT = 4,
}

const stageFactory = (): Stage => Stage.START;

const dataFactory = (): Data => ({
    team: {
        name: "",
        category: Category.NOT_SELECTED,
        email: "",
        phone: undefined,
    },
    players: Array.from({ length: 4 }, () => ({
        first_name: "",
        last_name: "",
        age: undefined,
    })),
    accepted: false,
});

const errorsFactory = (): Nested<Data, boolean> => ({
    team: {
        name: false,
        category: false,
        email: false,
        phone: false,
    },
    players: Array.from({ length: 4 }, () => ({
        first_name: false,
        last_name: false,
        age: false,
    })),
    accepted: false,
});

const stage = useState<Stage>("basketball-stage", stageFactory);

const data = ref<Data>(dataFactory());

const errors = ref<Errors>(errorsFactory());

const regex = {
    team: {
        name: /^.{3,}$/,
        category: /^[1-2]$/,
        email: /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
        phone: /^(?:\+\d{1,3}[-\s]?)?(?:\d[-\s]?){9}$/,
    },
    players: {
        first_name: /^.{3,}$/,
        last_name: /^.{3,}$/,
        age: /^[1-9][0-9]$/,
    },
    accepted: /^(true|false)$/,
} satisfies Patterns;

function validate(): boolean {
    switch (stage.value) {
        case Stage.TEAM: {
            const keys = Object.keys(data.value.team);

            return !keys.some(
                (key) =>
                    (errors.value.team[key] = !regex.team[key].test(
                        data.value.team[key],
                    )),
            );
        }
        case Stage.PLAYERS: {
            return !data.value.players.some((_, index) => {
                const keys = Object.keys(data.value.players[index]);

                const isLast = index === data.value.players.length - 1;
                const isEmpty = keys.every(
                    (key) => !data.value.players[index][key],
                );

                if (isLast && isEmpty) {
                    return false;
                }

                return keys.some(
                    (key) =>
                        (errors.value.players[index][key] = !regex.players[
                            key
                        ].test(data.value.players[index][key])),
                );
            });
        }
        case Stage.SUMMARY: {
            return !(errors.value.accepted = !regex.accepted.test(
                `${data.value.accepted}`,
            ));
        }
        default: {
            return false;
        }
    }
}

export default function () {
    const previous = () => {
        if (stage.value == Stage.START || stage.value == Stage.SENT) {
            return;
        }

        stage.value--;
    };

    const next = async () => {
        switch (stage.value) {
            case Stage.START: {
                stage.value++;
                break;
            }
            case Stage.TEAM:
            case Stage.PLAYERS: {
                if (!validate()) {
                    break;
                }

                stage.value++;

                break;
            }
            case Stage.SUMMARY: {
                if (!validate()) {
                    break;
                }

                const response = await $fetch("/api/form", {
                    method: "POST",
                    body: data.value,
                });

                if (!response) {
                    break;
                }

                if (response.status !== 202) {
                    break;
                }

                stage.value++;
                break;
            }
            case Stage.SENT: {
                break;
            }
        }
    };

    const set = (value: Stage) => {
        stage.value = value;
    };

    const reset = () => {
        stage.value = stageFactory();
        data.value = dataFactory();
        errors.value = errorsFactory();
    };

    return {
        Category,
        Stage,
        stage,
        data,
        errors,
        previous,
        next,
        set,
        reset,
    };
}
