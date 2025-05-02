import AcceptedList from './AcceptedList';
import OrderedList from './OrderedList';

const Dashboard = () => {
    return (
        <div className="flex flex-col items-center mt-8 md:flex-row md:justify-center gap-8 px-4">
            <AcceptedList />
            <OrderedList />
        </div>
    );
};

export default Dashboard;
