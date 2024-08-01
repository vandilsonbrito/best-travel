import { useQuery } from "@tanstack/react-query";

const TOKEN_ACCESS_ENV = process.env.NEXT_PUBLIC_ROUTE_ACCESS_TOKEN as string;
const fetchAccessToken = async () => {
    const response = await fetch('/api/auth', {
        headers: {
            'Authorization': `Bearer ${TOKEN_ACCESS_ENV}`
        }
    });
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

