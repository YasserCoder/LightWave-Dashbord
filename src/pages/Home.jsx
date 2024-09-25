import { useRecentOrders } from "../hook/order/useRecentOrders";
import { useRecentUsers } from "../hook/auth/useRecentUsers";
import { useUsers } from "../hook/auth/useUsers";

import Loader from "../ui/Loader";
import StatCards from "../features/dashbord/StatCards";
import TotalSales from "../features/dashbord/TotalSales";
import MostSoldBarChart from "../features/dashbord/MostSoldBarChart";
import MostSoldProducts from "../features/dashbord/MostSoldProducts";
import SelectDuration from "../features/dashbord/SelectDuration";
import Main from "../ui/Main";
import MainHeader from "../ui/MainHeader";

function Home() {
    const { isLoading, orders, isLoading2, lastOrders, numDays } =
        useRecentOrders();
    const { isLoading3, isLoading4, users, lastUsers } = useRecentUsers();
    const { isLoading: isCounting, count } = useUsers();
    return (
        <Main>
            <MainHeader title={"dashbord"}>
                <SelectDuration />
            </MainHeader>
            {isLoading ||
            isLoading2 ||
            isLoading3 ||
            isLoading4 ||
            isCounting ? (
                <Loader />
            ) : (
                <>
                    <StatCards
                        count={count}
                        users={users}
                        lastUsers={lastUsers}
                        orders={orders}
                        lastOrders={lastOrders}
                        numDays={numDays}
                    />
                    <TotalSales
                        orders={orders}
                        lastOrders={lastOrders}
                        numDays={numDays}
                    />
                    <div className="flex flex-col gap-8 lg:flex-row justify-between">
                        <MostSoldBarChart />
                        <MostSoldProducts />
                    </div>
                </>
            )}
        </Main>
    );
}

export default Home;
