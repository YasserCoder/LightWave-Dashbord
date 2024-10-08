import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

import { formatCurrency } from "../../utils/helpers";
import { useDeleteOrder } from "../../hook/order/useDeleteOrder";

import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import OrderForm from "./OrderForm";

import { FaTrash } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";

const tHead = ["Name", "Place", "Date", "Status", "Amount", ""];
const objStyle = {
    Name: "hidden xs:table-cell",
    Date: "hidden sm:table-cell",
    Place: "hidden lg:table-cell",
    Amount: "hidden xxs:table-cell",
};

function OrderTable({ orders }) {
    const navigate = useNavigate();
    return (
        <Table tHead={tHead} obj={objStyle}>
            {orders.map((order, index) => (
                <tr
                    key={index}
                    className="hover:bg-content cursor-pointer"
                    onClick={(e) => {
                        if (
                            e.target.tagName === "BUTTON" ||
                            e.target.closest("#modal")
                        ) {
                            return;
                        }
                        navigate(`order/${order.id}`);
                    }}
                >
                    <td className="px-2 sm:px-4 py-4 border-b border-content hidden xs:table-cell max-w-[80px] sm:max-w-[110px] lg:max-w-[160px] xl:max-w-none">
                        <p className="block text-sm text-nowrap line-clamp-1 font-medium">
                            {order.customerName}
                        </p>
                    </td>
                    <td className="px-2 sm:px-4 py-4 border-b border-content hidden lg:table-cell">
                        <p className="bloc text-sm ">{order.deliveryPlace}</p>
                    </td>
                    <td className="px-2 sm:px-4 py-4 border-b border-content hidden sm:table-cell">
                        <p className="flex gap-1 text-sm">
                            <span>
                                {format(
                                    new Date(order.created_at),
                                    "dd MMM yyyy"
                                )}
                            </span>
                            <span className="hidden lg:block">
                                {`, ${format(
                                    new Date(order.created_at),
                                    "HH:mm"
                                )}`}
                            </span>
                        </p>
                    </td>
                    <td className="px-2 sm:px-4 py-4 border-b border-content">
                        <div className="w-max">
                            <div
                                className={`grid items-center font-sans font-extrabold uppercase whitespace-nowrap py-1 px-2 text-xs rounded-md ${
                                    order.status === "pending"
                                        ? "bg-orange-300 text-orange-700"
                                        : order.status === "delivred"
                                        ? "bg-green-300 text-green-700"
                                        : order.status === "confirmed"
                                        ? "bg-sky-300 text-sky-700"
                                        : order.status === "shipped"
                                        ? "bg-violet-300 text-violet-700"
                                        : "bg-red-300 text-red-700"
                                }`}
                            >
                                <span>{order.status}</span>
                            </div>
                        </div>
                    </td>
                    <td className="px-2 sm:px-4 py-4 border-b border-content hidden xxs:table-cell">
                        <p className="text-sm">
                            {formatCurrency(order.totalAmount)}
                        </p>
                    </td>
                    <td className="px-2 lg:px-4 py-4  border-b border-content">
                        <Features id={order.id} status={order.status} />
                    </td>
                </tr>
            ))}
        </Table>
    );
}

function Features({ id, status }) {
    const { isDeleting, deleteOrder } = useDeleteOrder();

    function handleDelete(e) {
        e.stopPropagation();
        Swal.fire({
            title: "Are you sure?",
            text: "Delete Order Definitively!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
            customClass: {
                popup: "dark:bg-gray-800 dark:text-white",
            },
        }).then((result) => {
            if (result.isConfirmed) {
                deleteOrder(id);
            }
        });
    }
    return (
        <div className="flex items-center gap-1 xl:gap-2">
            <Modal>
                <Modal.Open opens="order-form">
                    <button className="p-1 hover:bg-bkg-secondary hover:text-main text-slate-500 dark:text-content rounded-md disabled:cursor-not-allowed">
                        <MdOutlineEdit />
                    </button>
                </Modal.Open>
                <Modal.Window name="order-form">
                    <OrderForm status={status} id={id} />
                </Modal.Window>
            </Modal>

            <Icon disabled={isDeleting} handleClick={handleDelete}>
                <FaTrash />
            </Icon>
        </div>
    );
}
function Icon({ handleClick, disabled, children }) {
    return (
        <button
            className="p-1 hover:bg-bkg-secondary hover:text-main text-slate-500 dark:text-content rounded-md disabled:cursor-not-allowed"
            onClick={handleClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}

export default OrderTable;
