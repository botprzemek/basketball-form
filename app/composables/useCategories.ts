export const useCategories = () => {
    const { token } = useRuntimeConfig();
    const { data: categories } = useFetch<Array<Category>>("/api/categories", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        method: "GET",
    });

    return {
        categories,
    };
};
