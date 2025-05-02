import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useOrderStore } from '../store/order';
import { useQueryClient } from '@tanstack/react-query';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  pedidoParaEditar?: {
    id: string;
    nome: string;
    telefone: string;
    descricao: string;
    status: 'pendente' | 'aceito' | 'rejeitado';
  };
};

type FormValues = {
  nome: string;
  telefone: string;
  descricao: string;
};

const OrderModal = ({ isOpen, onClose, pedidoParaEditar }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();

  const adicionarPedido = useOrderStore((state) => state.adicionarPedido);
  const editarPedido = useOrderStore((state) => state.editarPedido);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (pedidoParaEditar && isOpen) {
      setValue('nome', pedidoParaEditar.nome);
      setValue('telefone', pedidoParaEditar.telefone);
      setValue('descricao', pedidoParaEditar.descricao);
    } else if (!pedidoParaEditar && isOpen) {
      reset();
    }
  }, [pedidoParaEditar, isOpen, setValue, reset]);

  const onSubmit = (data: FormValues) => {
    if (pedidoParaEditar) {
      editarPedido({
        id: pedidoParaEditar.id,
        status: pedidoParaEditar.status,
        ...data,
      });
    } else {
      adicionarPedido(data);
    }
    queryClient.invalidateQueries({ queryKey: ['pedidos'] });

    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 right-0 h-full w-1/4 bg-gray-200 p-6 z-50 shadow-lg overflow-y-auto border-l border-gray-300 transition-transform duration-300 ease-in-out">
      <h2 className="text-xl font-bold mb-4">
        {pedidoParaEditar ? 'Editar Pedido' : 'Novo Pedido'}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            {...register('nome', {
              required: 'Nome é obrigatório',
              maxLength: {
                value: 50,
                message: 'Nome não pode ter mais de 50 caracteres',
              },
            })}
            placeholder="Nome"
            className="w-full p-2 border rounded"
          />
          {errors.nome && (
            <p className="text-red-500 text-sm">{errors.nome.message}</p>
          )}
        </div>

        <div>
          <input
            {...register('telefone', {
              required: 'Telefone é obrigatório',
              pattern: {
                value: /^[0-9]{10,11}$/,
                message:
                  'Telefone inválido. Digite um número válido de 10 ou 11 dígitos.',
              },
            })}
            placeholder="Telefone"
            className="w-full p-2 border rounded"
            maxLength={11}
          />
          {errors.telefone && (
            <p className="text-red-500 text-sm">{errors.telefone.message}</p>
          )}
        </div>

        <div>
          <textarea
            {...register('descricao', {
              required: 'Descrição é obrigatória',
              maxLength: {
                value: 200,
                message: 'Descrição não pode ter mais de 200 caracteres',
              },
            })}
            placeholder="Descrição"
            className="w-full p-2 border rounded"
            maxLength={200}
          />
          {errors.descricao && (
            <p className="text-red-500 text-sm">{errors.descricao.message}</p>
          )}
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => {
              reset();
              onClose();
            }}
            className="px-4 py-2 bg-red-500 rounded text-black hover:bg-red-700"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-black rounded hover:bg-green-700"
          >
            {pedidoParaEditar ? 'Salvar Alterações' : 'Cadastrar'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrderModal;
