import InputOrder from "../components/InputOrder";
import OrderedList from "../components/OrderedList";

const Home = () => {
    return (
      <div className="w-full h-screen p-6 bg-[#ffffff] flex flex-col justify-start items-center">
        <div className="bg-gray-300 w-full p-6 h-1/4 flex flex-col justify-center items-center rounded-2xl shadow-lg">
          <h2 className="text-black text-3xl font-bold text-center">Desafio Onbeef</h2>
        </div>
        <InputOrder/>
        <div className="w-full h-screen flex flex-row justify-around gap-4 mt-6">
          <div className="w-2/5 h-1/2 p-6 mt-6 rounded-2xl block flex flex-col justify-center items-center">
            <h3>aqui vai a lista de pedidos aceitos</h3>
          </div>
          <div className=" w-2/5 h-1/2 p-6 mt-6 rounded-2xl block flex flex-col justify-center items-center">
            <h3>Aqui vai a lista de pedidos</h3>
            <OrderedList/>
          </div>
        </div>
        
      </div>
    );
  };
  
  export default Home;
  