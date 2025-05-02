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
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const adicionarPedido = useOrderStore((state) => state.addOrder);
  const editarPedido = useOrderStore((state) => state.editOrder);
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="flex min-h-screen items-center justify-end p-4">
        <div className="card w-full max-w-md animate-fadeIn text-gray-800">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">
              {pedidoParaEditar ? 'Editar Pedido' : 'Novo Pedido'}
            </h2>
            <button 
              className="text-gray-500 hover:text-gray-800"
              onClick={() => {
                reset();
                onClose();
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 text-gray-800">
            <div>
              <label htmlFor="nome" className="mb-1 block text-sm font-medium text-gray-800">
                Nome
              </label>
              <input
                id="nome"
                {...register('nome', {
                  required: 'Nome é obrigatório',
                  maxLength: {
                    value: 50,
                    message: 'Nome não pode ter mais de 50 caracteres',
                  },
                })}
                placeholder="Nome do cliente"
                className="input-field text-gray-800"
              />
              {errors.nome && (
                <p className="mt-1 text-sm text-red-600">{errors.nome.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="telefone" className="mb-1 block text-sm font-medium text-gray-800">
                Telefone
              </label>
              <input
                id="telefone"
                {...register('telefone', {
                  required: 'Telefone é obrigatório',
                  pattern: {
                    value: /^[0-9]{10,11}$/,
                    message:
                      'Telefone inválido. Digite um número válido de 10 ou 11 dígitos.',
                  },
                })}
                placeholder="DDD + Número"
                className="input-field text-gray-800"
                maxLength={11}
              />
              {errors.telefone && (
                <p className="mt-1 text-sm text-red-600">{errors.telefone.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="descricao" className="mb-1 block text-sm font-medium text-gray-800">
                Descrição
              </label>
              <textarea
                id="descricao"
                {...register('descricao', {
                  required: 'Descrição é obrigatória',
                  maxLength: {
                    value: 200,
                    message: 'Descrição não pode ter mais de 200 caracteres',
                  },
                })}
                placeholder="Descreva o pedido"
                className="input-field h-24 resize-none text-gray-800"
                maxLength={200}
              />
              {errors.descricao && (
                <p className="mt-1 text-sm text-red-600">{errors.descricao.message}</p>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => {
                  reset();
                  onClose();
                }}
                className="border border-gray-300 bg-white hover:bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-lg"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Salvando...' : (pedidoParaEditar ? 'Salvar Alterações' : 'Cadastrar')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
