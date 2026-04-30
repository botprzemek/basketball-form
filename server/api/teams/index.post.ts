export default defineEventHandler(async (event) => {
    const team = await readBody<Team>(event);

    if (!team) {
        setResponseStatus(event, 400);

        return;
    }

    const teams = useTeams();
    await teams.register(team);

    setResponseStatus(event, 202);
});
