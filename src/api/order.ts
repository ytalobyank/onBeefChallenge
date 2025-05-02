import { useQuery } from '@tanstack/react-query';
import { useOrderStore } from '../store/order';

export const useOrderQuery = () => {
    return useQuery({
        queryKey: ['pedidos'],
        queryFn: () => {
            const pedidos = useOrderStore.getState().orders;
            return [...pedidos];
        },
        staleTime: 0,
        gcTime: Infinity,
    });
};
