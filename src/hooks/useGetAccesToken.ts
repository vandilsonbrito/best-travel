import { useQuery } from "@tanstack/react-query";

const fetchAccessToken = async () => {
    const response = await fetch('/api/auth');
    const data = await response.json();
    return data;   
}

export function useGetAccesToken() {
    const query = useQuery({
        queryFn: fetchAccessToken,
        queryKey: ['access-token'],
    })
    return query;
}

