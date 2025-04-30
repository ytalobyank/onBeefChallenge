import { create } from 'zustand';

type Order = {
  id: number;
  nome: string;
  telefone: string;
  descricao: string;
};

type OrderStore = {
  pedidos: Order[];
  adicionarPedido: (pedido: Omit<Order, 'id'>) => void;
};

export const useOrderStore = create<OrderStore>((set) => ({
  pedidos: [],
  adicionarPedido: (pedido) =>
    set((state) => ({
      pedidos: [...state.pedidos, { ...pedido, id: Date.now() }],
    })),
}));
