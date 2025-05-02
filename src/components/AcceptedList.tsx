import { useOrderQuery } from '../api/order';

const AcceptedList = () => {
  const { data: pedidos = [] } = useOrderQuery();

  const pedidosAceitos = pedidos.filter((pedido) => pedido.status === 'aceito');

  return (
    <div className="card">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-green-700">Pedidos Aceitos</h2>
        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
          {pedidosAceitos.length} aceitos
        </span>
      </div>

      {pedidosAceitos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <svg className="mb-2 h-10 w-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
          </svg>
          <p className="text-gray-500">Nenhum pedido aceito ainda</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {pedidosAceitos.map((pedido) => (
            <li 
              key={pedido.id} 
              className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm transition-all hover:shadow-md"
            >
              <div className="p-4">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-medium text-gray-800">{pedido.nome}</h3>
                  <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                    Aceito
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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AcceptedList;
