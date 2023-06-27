import "../styles/App.css";
function Pagination({ pages, setCurrentPage }) {
    return (
        <div className="pagination">
            <a href="#">Previous</a>
            <a href="#">1</a>
            <a href="#">Next</a>
        </div>
    );
}

export default Pagination;
