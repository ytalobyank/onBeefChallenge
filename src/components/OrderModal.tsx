import { useForm } from 'react-hook-form';
import { useOrderStore } from '../store/order';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  buttonRef: React.RefObject<HTMLButtonElement | null>;
};

type FormValues = {
  nome: string;
  telefone: string;
  descricao: string;
};

const OrderModal = ({ isOpen, onClose, buttonRef }: Props) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>();
  const adicionarPedido = useOrderStore((state) => state.adicionarPedido);

  const onSubmit = (data: FormValues) => {
    adicionarPedido(data);
    reset();
    onClose();
  };

  if (!isOpen) return null;

  const buttonPosition = buttonRef.current?.getBoundingClientRect();
  const left = buttonPosition?.left ?? 0;
  const top = (buttonPosition?.top ?? 0) + (buttonPosition?.height ?? 0) + 10;
  const height = buttonPosition?.height ?? 0;

  return (
    <div
      className="fixed bg-gray-300 bg-opacity-50 z-50 backdrop-blur-md"
      style={{
        left: left,
        top: top,
      }}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Novo Pedido</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              {...register('nome', {
                required: 'Nome é obrigatório',
                maxLength: { value: 50, message: 'Nome não pode ter mais de 50 caracteres' }
              })}
              placeholder="Nome"
              className="w-full p-2 border rounded"
            />
            {errors.nome && <p className="text-red-500 text-sm">{errors.nome.message}</p>}
          </div>

          <div>
            <input
              {...register('telefone', {
                required: 'Telefone é obrigatório',
                pattern: {
                  value: /^[0-9]{10,11}$/,
                  message: 'Telefone inválido. Digite um número válido de 10 ou 11 dígitos.'
                }
              })}
              placeholder="Telefone"
              className="w-full p-2 border rounded"
              maxLength={11}            />
            {errors.telefone && <p className="text-red-500 text-sm">{errors.telefone.message}</p>}
          </div>

          <div>
            <textarea
              {...register('descricao', {
                required: 'Descrição é obrigatória',
                maxLength: { value: 200, message: 'Descrição não pode ter mais de 200 caracteres' }
              })}
              placeholder="Descrição"
              className="w-full p-2 border rounded"
              maxLength={200}
            />
            {errors.descricao && <p className="text-red-500 text-sm">{errors.descricao.message}</p>}
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderModal;
