export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, "id");

    if (!id) {
        setResponseStatus(event, 400);

        return;
    }

    const teams = useTeams();
    await teams.verify(id+);

    setResponseStatus(event, 202);
});
