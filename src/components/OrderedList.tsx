import { useState } from 'react';
import { Order, useOrderStore } from '../store/order';
import OrderModal from './OrderModal';
import { useOrderQuery } from '../api/order';
import { useQueryClient } from '@tanstack/react-query';

const OrderedList = () => {
  const queryClient = useQueryClient();
  const { data: pedidos = [] } = useOrderQuery();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pedidoParaEditar, setPedidoParaEditar] = useState<Order | undefined>(undefined);

  const handleAbrirModal = (pedido: Order) => {
    setPedidoParaEditar(pedido);
    setIsModalOpen(true);
  };

  const handleFecharModal = () => {
    setPedidoParaEditar(undefined);
    setIsModalOpen(false);
  };

  const handleAceitarPedido = (id: string) => {
    useOrderStore.getState().acceptOrder(id);
    queryClient.invalidateQueries({ queryKey: ['pedidos'] });
  };

  const handleRejeitarPedido = (id: string) => {
    useOrderStore.getState().rejectOrder(id);
    queryClient.invalidateQueries({ queryKey: ['pedidos'] });
  };

  const pedidosPendentes = pedidos.filter((pedido) => pedido.status === 'pendente');

  return (
    <div className="card">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">Lista de Pedidos</h2>
        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
          {pedidosPendentes.length} pedidos
        </span>
      </div>

      {pedidosPendentes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <svg className="mb-2 h-10 w-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <p className="text-gray-500">Nenhum pedido pendente no momento</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {pedidosPendentes.map((pedido) => (
            <li
              key={pedido.id}
              className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm transition-all hover:shadow-md"
            >
              <div
                className="cursor-pointer p-4"
                onClick={() => handleAbrirModal(pedido)}
              >
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-medium text-gray-800">{pedido.nome}</h3>
                  <span className="rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                    Pendente
                  </span>
                </div>
                <div className="space-y-1 text-sm text-gray-600">
                  <p className="flex items-center gap-1">
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {pedido.telefone}
                  </p>
                  <p className="line-clamp-2">{pedido.descricao}</p>
                </div>
              </div>
              <div className="flex border-t border-gray-100 bg-gray-50">
                <button
                  onClick={() => handleAceitarPedido(pedido.id)}
                  className="flex-1 border-r border-gray-100 px-4 py-2 text-sm font-medium text-green-600 hover:bg-green-50 hover:text-green-700"
                >
                  Aceitar
                </button>
                <button
                  onClick={() => handleRejeitarPedido(pedido.id)}
                  className="flex-1 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                  Rejeitar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {isModalOpen && (
        <OrderModal
          isOpen={isModalOpen}
          onClose={() => {
            queryClient.invalidateQueries({ queryKey: ['pedidos'] });
            handleFecharModal();
          }}
          pedidoParaEditar={pedidoParaEditar}
        />
      )}
    </div>
  );
};

export default OrderedList;
