export const useCategories = () => {
    const { data: categories } = useFetch<Array<Category>>("/api/categories", {
        method: "GET",
    });

    return {
        categories,
    };
};
