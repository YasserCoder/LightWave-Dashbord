import ReactPaginate from "react-paginate";

import { useSearchParams } from "react-router-dom";
import { useScreenSize } from "../hook/useScreenSize";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function Pagination({ count, pageSize }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const { screenSize: isSmallScreen } = useScreenSize(768);
    let currentPage = !searchParams.get("page")
        ? 1
        : Number(searchParams.get("page"));

    const pageCount = Math.ceil(count / pageSize);

    if (currentPage > pageCount) {
        currentPage = pageCount;
    }

    const handlePageClick = (data) => {
        searchParams.set("page", data.selected + 1);
        setSearchParams(searchParams);
    };

    if (pageCount <= 1) return null;

    return (
        <div className="w-full mx-auto">
            <ReactPaginate
                forcePage={currentPage - 1}
                previousLabel={<FaChevronLeft />}
                nextLabel={<FaChevronRight />}
                breakLabel={"..."}
                pageCount={pageCount}
                marginPagesDisplayed={isSmallScreen ? 1 : 2}
                pageRangeDisplayed={isSmallScreen ? 1 : 3}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                activeClassName={"active"}
            />
        </div>
    );
}

export default Pagination;
