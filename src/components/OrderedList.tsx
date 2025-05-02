import { useState } from 'react';
import { Pedido, useOrderStore } from '../store/order';
import OrderModal from './OrderModal';
import { useOrderQuery } from '../api/order';
import { useQueryClient } from '@tanstack/react-query';

const OrderedList = () => {
  const queryClient = useQueryClient();
  const { data: pedidos = [] } = useOrderQuery();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pedidoParaEditar, setPedidoParaEditar] = useState<Pedido | undefined>(undefined);

  const handleAbrirModal = (pedido: Pedido) => {
    setPedidoParaEditar(pedido);
    setIsModalOpen(true);
  };

  const handleFecharModal = () => {
    setPedidoParaEditar(undefined);
    setIsModalOpen(false);
  };

  const handleAceitarPedido = (id: string) => {
    useOrderStore.getState().aceitarPedido(id);
    queryClient.invalidateQueries({ queryKey: ['pedidos'] });
  };

  const handleRejeitarPedido = (id: string) => {
    useOrderStore.getState().rejeitarPedido(id);
    useOrderStore.getState().resetPedidos();
    queryClient.invalidateQueries({ queryKey: ['pedidos'] });
  };

  const pedidosPendentes = pedidos.filter((pedido) => pedido.status === 'pendente');

  return (
    <div className="w-[35vw] min-w-[300px] bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Lista de Pedidos</h2>

      <ul className="space-y-4">
        {pedidosPendentes.length === 0 && (
          <p className="text-gray-600 italic">Nenhum pedido pendente.</p>
        )}

        {pedidosPendentes.map((pedido) => (
          <li
            key={pedido.id}
            className="p-4 rounded shadow bg-gray-100 relative"
          >
            <div
              className="cursor-pointer"
              onClick={() => handleAbrirModal(pedido)}
            >
              <p><strong>Nome:</strong> {pedido.nome}</p>
              <p><strong>Telefone:</strong> {pedido.telefone}</p>
              <p><strong>Descrição:</strong> {pedido.descricao}</p>
            </div>
            <div className="absolute bottom-2 right-2 flex gap-2">
              <button
                onClick={() => handleAceitarPedido(pedido.id)}
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
              >
                Aceitar
              </button>
              <button
                onClick={() => handleRejeitarPedido(pedido.id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
              >
                Rejeitar
              </button>
            </div>
          </li>
        ))}
      </ul>

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
