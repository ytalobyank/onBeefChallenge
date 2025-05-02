import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Order = {
  id: string;
  nome: string;
  telefone: string;
  descricao: string;
  status: 'pendente' | 'aceito' | 'rejeitado';
};

type OrderStore = {
  orders: Order[];
  addOrder: (pedido: Omit<Order, 'id' | 'status'>) => void;
  editOrder: (pedido: Order) => void;
  removeOrder: (id: string) => void;
  acceptOrder: (id: string) => void;
  rejectOrder: (id: string) => void;
  resetOrder: () => void;
};


export const useOrderStore = create<OrderStore>()(
  persist(
    (set) => ({
      orders: [],
      addOrder: (pedidoSemId) =>
        set((state) => ({
          orders: [
            ...state.orders,
            {
              id: crypto.randomUUID(),
              status: 'pendente',
              ...pedidoSemId,
            },
          ],
        })),
      editOrder: (pedidoAtualizado) =>
        set((state) => ({
          orders: state.orders.map((p) =>
            p.id === pedidoAtualizado.id ? { ...p, ...pedidoAtualizado } : p
          ),
        })),
      removeOrder: (id) =>
        set((state) => ({
          orders: state.orders.filter((p) => p.id !== id),
        })),
      acceptOrder: (id) =>
        set((state) => ({
          orders: state.orders.map((p) =>
            p.id === id ? { ...p, status: 'aceito' } : p
          ),
        })),
      rejectOrder: (id) =>
        set((state) => ({
          orders: state.orders.map((p) =>
            p.id === id ? { ...p, status: 'rejeitado' } : p
          ),
        })),

      resetOrder: () =>
        set(() => ({
          orders: [],
        })),
    }),
    {
      name: 'pedido-storage',
      partialize: (state) => ({ pedidos: state.orders }),
    }
  )
);
