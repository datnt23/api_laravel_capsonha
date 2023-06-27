import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { actions, useStore } from "../store";
import Paginate from "react-paginate";
import "../styles/pagination.css";
import "../styles/loading.css";

function ChuyenVien() {
    const [data, setData] = useState([]);
    const [state, dispatch] = useStore();
    const [loading, setLoading] = useState(false);
    const [pageNumber, setPageNumber] = useState();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios({
                    method: "GET",
                    url: `${
                        import.meta.env.VITE_LOCAL_HOST
                    }/chuyen_vien/danhsachhoso`,
                    headers: {
                        Authorization: `Bearer ${state.data[0].token}`,
                    },
                });
                setData(response.data.data);
                setPageNumber(response.data.last_page);
                console.log(response.data.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);
    const handleClick = (obj) => {
        dispatch(actions.setDataHoSo(obj));
        navigate("/chuyenvien/xemxet");
    };
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };
    const fetchDataPage = async (page) => {
        const response = await axios({
            method: "GET",
            url: `${
                import.meta.env.VITE_LOCAL_HOST
            }/chuyen_vien/danhsachhoso?page=${page}`,
            headers: {
                Authorization: `Bearer ${state.data[0].token}`,
            },
        });
        const data = await response.data;
        setData(data.data);
    };
    const handlePageClick = (event) => {
        let currentPage = event.selected + 1;
        fetchDataPage(currentPage);
    };
    return (
        <div>
            <h1>Danh Sách Hồ Sơ Đang Thụ Lý</h1>
            <button onClick={handleLogout}>Đăng xuất</button>
            <br />
            {loading ? (
                <div style={{ textAlign: "center" }}>
                    <div class="lds-spinner">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            ) : (
                <>
                    <table border={1}>
                        <tr>
                            <th>Mã hồ sơ</th>
                            <th>Họ tên chủ hộ</th>
                            <th>Số tờ</th>
                            <th>Số thửa</th>
                            <th>Địa chỉ</th>
                            <th>Trạng thái</th>
                            <th>Thụ lý</th>
                        </tr>
                        {data.length ? (
                            data.map((obj, index) => (
                                <tr key={index}>
                                    <td>{obj.id}</td>
                                    <td>{obj.ho_ten_chu_ho}</td>
                                    <td>{obj.so_to}</td>
                                    <td>{obj.so_thua}</td>
                                    <td>
                                        {obj.get_phuong.name},{" "}
                                        {obj.get_quan.name}
                                    </td>
                                    <td>
                                        {
                                            obj.get_chi_tiet_ho_so
                                                .get_trang_thai.ten_trang_thai
                                        }
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleClick(obj)}
                                        >
                                            Xem xét
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <>Không có hồ sơ thụ lý...</>
                        )}
                    </table>
                    <Paginate
                        previousLabel="Previous"
                        nextLabel="Next"
                        breakLabel="..."
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={3}
                        pageCount={pageNumber}
                        onPageChange={handlePageClick}
                        pageClassName={"item pagination-page"}
                        containerClassName="pagination"
                        nextClassName={"item next "}
                        previousClassName={"item previous"}
                        disabledClassName={"disabled-page"}
                        activeClassName={"item active "}
                        breakClassName={"item break-me "}
                    />
                </>
            )}
        </div>
    );
}

export default ChuyenVien;
