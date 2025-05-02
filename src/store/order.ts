import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Pedido = {
  id: string;
  nome: string;
  telefone: string;
  descricao: string;
  status: 'pendente' | 'aceito' | 'rejeitado';
};

type OrderStore = {
  pedidos: Pedido[];
  adicionarPedido: (pedido: Omit<Pedido, 'id' | 'status'>) => void;
  editarPedido: (pedido: Pedido) => void;
  removerPedido: (id: string) => void;
  aceitarPedido: (id: string) => void;
  rejeitarPedido: (id: string) => void;
  resetPedidos: () => void;
};


export const useOrderStore = create<OrderStore>()(
  persist(
    (set) => ({
      pedidos: [],
      adicionarPedido: (pedidoSemId) =>
        set((state) => ({
          pedidos: [
            ...state.pedidos,
            {
              id: crypto.randomUUID(),
              status: 'pendente',
              ...pedidoSemId,
            },
          ],
        })),
      editarPedido: (pedidoAtualizado) =>
        set((state) => ({
          pedidos: state.pedidos.map((p) =>
            p.id === pedidoAtualizado.id ? { ...p, ...pedidoAtualizado } : p
          ),
        })),
      removerPedido: (id) =>
        set((state) => ({
          pedidos: state.pedidos.filter((p) => p.id !== id),
        })),
      aceitarPedido: (id) =>
        set((state) => ({
          pedidos: state.pedidos.map((p) =>
            p.id === id ? { ...p, status: 'aceito' } : p
          ),
        })),
      rejeitarPedido: (id) =>
        set((state) => ({
          pedidos: state.pedidos.map((p) =>
            p.id === id ? { ...p, status: 'rejeitado' } : p
          ),
        })),

      resetPedidos: () =>
        set(() => ({
          pedidos: [],
        })),
    }),
    {
      name: 'pedido-storage',
      partialize: (state) => ({ pedidos: state.pedidos }),
    }
  )
);
