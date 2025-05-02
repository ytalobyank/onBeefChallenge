import AcceptedList from './AcceptedList';
import OrderedList from './OrderedList';

const Dashboard = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <OrderedList />
            <AcceptedList />
        </div>
    );
};

export default Dashboard;
