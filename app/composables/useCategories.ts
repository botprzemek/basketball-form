export const useCategories = () => {
    const { token } = useRuntimeConfig();
    const { data: categories } = useFetch("/api/categories", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return {
        categories,
    };
};
