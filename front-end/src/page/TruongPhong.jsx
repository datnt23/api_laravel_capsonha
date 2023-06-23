import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { actions, useStore } from "../store";

function TruongPhong() {
	const [data, setData] = useState([]);
	const [state, dispatch] = useStore();
	const navigate = useNavigate();
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios({
					method: "GET",
					url: `${
						import.meta.env.VITE_LOCAL_HOST
					}/truong_phong/danhsachhosothuly`,
					headers: {
						Authorization: `Bearer ${state.data[0].token}`,
					},
				});
				setData(response.data);
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
	}, []);
	const handleClick = (obj) => {
		dispatch(actions.setDataHoSo(obj));
		navigate("/truongphong/duyet");
	};
	const handleLogout = () => {
		localStorage.removeItem("token");
		navigate("/login");
	};
	return (
		<div>
			<h1>Danh Sách Hồ Sơ Đang Chờ Duyệt</h1>
			<button onClick={handleLogout}>Đăng xuất</button>
			<ul>
				{!data.length ? (
					<>Không có hồ sơ duyệt...</>
				) : (
					data.map((obj) => (
						<>
							<li key={obj.id}>
								<div>Mã hồ sơ: {obj.id}</div>
								<div>Họ tên chủ hộ: {obj.ho_ten_chu_ho}</div>
								<div>Số tờ: {obj.so_to}</div>
								<div>Số thửa: {obj.so_thua}</div>
								<div>
									{obj.get_phuong.name}, {obj.get_quan.name}
								</div>
								<div>
									Trạng thái:{" "}
									{obj.get_chi_tiet_ho_so.get_trang_thai.ten_trang_thai}
								</div>
								<button onClick={() => handleClick(obj)}>Xem xét</button>
							</li>
						</>
					))
				)}
			</ul>
		</div>
	);
}

export default TruongPhong;
