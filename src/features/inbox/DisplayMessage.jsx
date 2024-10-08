import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";

import { useMoveBack } from "../../hook/useMoveBack";
import { useMessageDetails } from "../../hook/message/useMessageDetails";
import { useDeleteMessage } from "../../hook/message/useDeleteMessage";

import Main from "../../ui/Main";
import BackButton from "../../ui/BackButton";
import Loader from "../../ui/Loader";

import { FaTrash } from "react-icons/fa6";

function DisplayMessage() {
    const moveBack = useMoveBack();
    const location = useLocation();
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const messageId = Number(pathSegments[pathSegments.length - 1]);
    const { isDeleting, deleteMessage } = useDeleteMessage();

    function handleDelete(id) {
        Swal.fire({
            title: "Are you sure?",
            text: "Delete Message Definitively!",
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
                deleteMessage(id);
                moveBack();
            }
        });
    }

    const { isLoading, messageInfo } = useMessageDetails(messageId);
    return (
        <Main>
            <BackButton />
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <div className="flex flex-col items-start xxs:flex-row  xxs:justify-between  xxs:items-center mt-3 gap-y-2">
                        <h1 className="text-2xl xs:text-4xl lg:text-6xl font-bold capitalize">
                            {`Message#${messageId}`}
                        </h1>
                        <div className="flex items-center gap-x-2 self-end">
                            <div
                                className={`uppercase py-0.5 lg:py-1 px-2 xs:px-4 lg:px-6 rounded-full text-xs xs:text-sm lg:text-lg shadow-md font-bold ${
                                    messageInfo.source === "client"
                                        ? "bg-green-300 text-green-700 border-2 border-green-700"
                                        : messageInfo.source === "admin"
                                        ? "bg-red-300 text-red-700 border-2 border-red-700"
                                        : ""
                                }`}
                            >
                                {messageInfo.source}
                            </div>
                            <button
                                className=" text-red-500 hover:scale-105 duration-300"
                                title="Delete"
                                disabled={isDeleting}
                                onClick={() => handleDelete(messageId)}
                            >
                                <FaTrash className="size-5 xs:size-6 lg:size-9" />
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-between sm:items-center gap-2 flex-col sm:flex-row mt-4">
                        <div className="flex gap-1.5 items-center">
                            <div
                                className={`capitalize text-xl xs:text-3xl size-10 xs:size-12 flex justify-center items-center rounded-full text-white bg-orange-400`}
                            >
                                {messageInfo.name.charAt(0)}
                            </div>
                            <div>
                                <p className="flex items-baseline gap-x-2 flex-wrap">
                                    <span className="font-semibold xs:font-bold text-xl xs:text-2xl capitalize">
                                        {`${messageInfo.name}`}
                                    </span>
                                    <span className="text-sm font-extralight xs:font-light ">
                                        {`-${messageInfo.phone}-`}
                                    </span>
                                </p>
                                <p className="text-sm font-extralight xs:font-light">{`<${messageInfo.email}>`}</p>
                            </div>
                        </div>
                        <div className="flex justify-between items-center w-full xs:w-fit self-end">
                            <span className="text-sm font-extralight xs:font-light xs:hidden">
                                {`-${messageInfo.phone}-`}
                            </span>
                            <p className="flex gap-1 text-sm self-end">
                                <span>
                                    {format(
                                        new Date(messageInfo.created_at),
                                        "dd MMM yyyy"
                                    )}
                                </span>
                                <span className="hidden xs:block">
                                    {`, ${format(
                                        new Date(messageInfo.created_at),
                                        "HH:mm"
                                    )}`}
                                </span>
                            </p>
                        </div>
                    </div>
                    <span className="w-full h-px bg-content mt-[6px]"></span>
                    <div className="border min-h-44 bg-bkg-main py-5 px-4 xs:px-6 lg:px-8 first-letter:uppercase sm:text-lg indent-1">
                        {`${messageInfo.content}.`}
                    </div>
                </>
            )}
        </Main>
    );
}

export default DisplayMessage;
