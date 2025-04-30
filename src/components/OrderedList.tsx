import { useOrderStore } from '../store/order';

const OrderedList = () => {
  const pedidos = useOrderStore((state) => state.pedidos);

  return (
    <div className="mt-8 w-full max-w-2xl bg-gray-300 p-4 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Lista de Pedidos</h2>

        <ul className="space-y-4">
          {pedidos.map((pedido) => (
            <li key={pedido.id} className="bg-gray-300 p-4 rounded shadow">
              <p><strong>Nome:</strong> {pedido.nome}</p>
              <p><strong>Telefone:</strong> {pedido.telefone}</p>
              <p><strong>Descrição:</strong> {pedido.descricao}</p>
            </li>
          ))}
        </ul>
    </div>
  );
};

export default OrderedList;
