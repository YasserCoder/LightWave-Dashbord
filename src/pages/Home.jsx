import {
    FaArrowTrendDown,
    FaArrowTrendUp,
    FaChartLine,
    FaUsers,
} from "react-icons/fa6";
import { IoCubeSharp } from "react-icons/io5";
import { RxCounterClockwiseClock } from "react-icons/rx";
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

function Home() {
    return (
        <div className="container py-7 flex flex-col gap-y-[30px]">
            <h1 className="text-2xl xs:text-5xl font-extrabold capitalize">
                dashbord
            </h1>
            <StatCards />

            <Charts />
        </div>
    );
}

const data = [
    {
        name: "Page A",
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: "Page B",
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: "Page C",
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: "Page D",
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: "Page E",
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: "Page F",
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: "Page G",
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];
function Charts() {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" />
                <Tooltip />
                <Legend />
                <XAxis dataKey="name" />
                <YAxis />
                <Line
                    type="monotone"
                    dataKey="pv"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                />
                <Line
                    type="monotone"
                    dataKey="uv"
                    stroke="#82ca9d"
                    strokeWidth={2}
                />
            </LineChart>
        </ResponsiveContainer>
    );
}
function StatCards() {
    return (
        <div className="flex items-center justify-between flex-wrap gap-y-4 sm:gap-y-6 lg:gap-y-8">
            <div className="bg-bkg-main rounded-xl p-4 space-y-[30px] basis-[100%] sm:basis-[48%] md:basis-[47%] xl:basis-[24%]">
                <div className="flex justify-between">
                    <div className="space-y-4">
                        <p className="font-light capitalize">total user</p>
                        <h2 className="text-2xl font-extrabold">1,200</h2>
                    </div>
                    <div className="p-4 rounded-3xl bg-indigo-600 bg-opacity-30 h-fit">
                        <FaUsers className="text-indigo-600 text-3xl" />
                    </div>
                </div>
                <p className="flex gap-1 items-center">
                    <span className="flex gap-2 items-center text-green-600">
                        <span>
                            <FaArrowTrendUp />
                        </span>
                        <span>8.6%</span>
                    </span>
                    <span>Up from yesterday</span>
                </p>
            </div>
            <div className="bg-bkg-main rounded-xl p-4 space-y-[30px] basis-[100%] sm:basis-[48%] md:basis-[47%] xl:basis-[24%]">
                <div className="flex justify-between">
                    <div className="w-[100px] space-y-4">
                        <p className="font-light capitalize">total orders</p>
                        <h2 className="text-2xl font-extrabold">10,293</h2>
                    </div>
                    <div className="p-4 rounded-3xl bg-yellow-500 bg-opacity-30 h-fit">
                        <IoCubeSharp className="text-yellow-500 text-3xl" />
                    </div>
                </div>
                <p className="flex gap-1 items-center">
                    <span className="flex gap-2 items-center text-green-600">
                        <span>
                            <FaArrowTrendUp />
                        </span>
                        <span>1.3%</span>
                    </span>
                    <span>Up from past week</span>
                </p>
            </div>
            <div className="bg-bkg-main rounded-xl p-4 space-y-[30px] basis-[100%] sm:basis-[48%] md:basis-[47%] xl:basis-[24%]">
                <div className="flex justify-between">
                    <div className="w-[100px] space-y-4">
                        <p className="font-light capitalize">total sales</p>
                        <h2 className="text-2xl font-extrabold">$65,000</h2>
                    </div>
                    <div className="p-4 rounded-3xl bg-green-400 bg-opacity-30 h-fit">
                        <FaChartLine className="text-green-400 text-3xl" />
                    </div>
                </div>
                <p className="flex gap-1 items-center">
                    <span className="flex gap-2 items-center text-red-500">
                        <span>
                            <FaArrowTrendDown />
                        </span>
                        <span>4.3%</span>
                    </span>
                    <span>Down from Yesterday</span>
                </p>
            </div>
            <div className="bg-bkg-main rounded-xl p-4 space-y-[30px] basis-[100%] sm:basis-[48%] md:basis-[47%] xl:basis-[24%]">
                <div className="flex justify-between">
                    <div className="w-[100px] space-y-4">
                        <p className="font-light capitalize">total pending</p>
                        <h2 className="text-2xl font-extrabold">10,293</h2>
                    </div>
                    <div className="p-4 rounded-3xl bg-red-400 bg-opacity-30 h-fit">
                        <RxCounterClockwiseClock className="text-red-400 text-3xl" />
                    </div>
                </div>
                <p className="flex gap-1 items-center">
                    <span className="flex gap-2 items-center text-green-600">
                        <span>
                            <FaArrowTrendUp />
                        </span>
                        <span>1.3%</span>
                    </span>
                    <span>Up from past week</span>
                </p>
            </div>
        </div>
    );
}
export default Home;