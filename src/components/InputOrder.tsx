import { useState, useRef } from 'react';
import OrderModal from './OrderModal';

const InputOrder = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null); // Tipo correto aqui

  return (
    <>
      <button
        ref={buttonRef}
        className="text-black px-4 py-2 mt-6 rounded hover:bg-gray-500 transition duration-300 ease-in-out bg-gray-300"
        onClick={() => setIsModalOpen(true)}
      >
        Novo pedido
      </button>
      <OrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        buttonRef={buttonRef} 
      />
    </>
  );
};

export default InputOrder;
