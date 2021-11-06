import React from "react"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import ReactPaginate from "react-paginate"

interface PaginationProps{
	// values props
	countPages: number

	// action props
	changeCountPages: () => void
	changeCurrentPage: (selectedItem: { selected: number }) => void
}

const Pagination: React.FC<PaginationProps> = props => {
	return (
		<div className="pagination">
			<ReactPaginate
				previousLabel={<FaChevronLeft />}
				nextLabel={<FaChevronRight />}
				breakLabel={'...'}
				breakClassName={'break-me'}
				pageCount={props.countPages}
				marginPagesDisplayed={2}
				pageRangeDisplayed={5}
				onPageChange={props.changeCurrentPage}
				containerClassName={'pagination_pages_buttons'}
				activeClassName={'active'}
			/>
		</div>
	)
}

export default Pagination