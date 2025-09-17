
export const fetchBuyers = async (searchParams) => {
    try {
        const res = await fetch(`/api/buyers/import?${searchParams.toString()}`);
        const data = await res.json();
        if (data && !data.error) return data.data || [];
        else {
            console.error("Error fetching buyers:", data.error);
            return [];
        }
    } catch (error) {
        console.error("Error fetching buyers:", error);
        return error;
    }
};