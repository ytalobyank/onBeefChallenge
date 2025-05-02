import { useState } from 'react';
import OrderModal from './OrderModal';

const InputOrder = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex justify-center">
      <button
        className="text-black px-4 py-2 rounded hover:bg-gray-500 transition duration-300 ease-in-out bg-gray-300"
        onClick={() => setIsModalOpen(true)}
      >
        Novo pedido
      </button>
      <OrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default InputOrder;
