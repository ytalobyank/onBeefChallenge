import { useOrderQuery } from '../api/order';

const AcceptedList = () => {
  const { data: pedidos = [] } = useOrderQuery();

  const pedidosAceitos = pedidos.filter((pedido) => pedido.status === 'aceito');

  return (
    <div className="w-[35vw] min-w-[300px] bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-green-800">Pedidos Aceitos</h2>

      <ul className="space-y-4">
        {pedidosAceitos.length === 0 && (
          <p className="text-gray-600 italic">Nenhum pedido aceito ainda.</p>
        )}

        {pedidosAceitos.map((pedido) => (
          <li key={pedido.id} className="p-4 rounded shadow bg-gray-100">
            <p><strong>Nome:</strong> {pedido.nome}</p>
            <p><strong>Telefone:</strong> {pedido.telefone}</p>
            <p><strong>Descrição:</strong> {pedido.descricao}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AcceptedList;
