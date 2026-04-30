export default defineEventHandler(async (_event) => {
    const teams = useTeams();
    const data = await teams.get();

    return data;
});
