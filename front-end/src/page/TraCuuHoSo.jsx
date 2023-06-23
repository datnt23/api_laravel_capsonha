import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../store";

function TraCuuHoSo() {
	const [idInput, setIdInput] = useState("");
	const [data, setData] = useState();
	const [state, dispatch] = useStore();
	const handleSubmit = async () => {
		try {
			const response = await axios({
				method: "GET",
				url: `${import.meta.env.VITE_LOCAL_HOST}/user/hoso/${idInput}`,
				headers: {
					Authorization: `Bearer ${state.data[0].token}`,
				},
			});
			setData(response.data);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<>
			<li>
				<Link to={"/"}>Home</Link>
			</li>
			<li>
				<Link to={"/nophoso"}>Nộp Hồ Sơ</Link>
			</li>
			<input
				type="number"
				name="id"
				value={idInput}
				onChange={(e) => setIdInput(e.target.value)}
			/>
			<button onClick={handleSubmit}>Xem</button>
			<div>
				{data ? (
					<div>
						<div>Mã hồ sơ: {data.id}</div>
						<div>Họ tên chủ hộ: {data.ho_ten_chu_ho}</div>
						<div>Số tờ: {data.so_to}</div>
						<div>Số thửa: {data.so_thua}</div>
						<div>
							{data.get_phuong.name}, {data.get_phuong.get_quan.name}
						</div>
						<div>
							Trạng thái:{" "}
							{data.get_chi_tiet_ho_so.get_trang_thai.ten_trang_thai}
						</div>
					</div>
				) : (
					<>
						<h3>Nhập mã hồ sơ thông tin trạng thái hồ sơ...</h3>
						<h3>
							Hoặc chưa nộp hồ sơ...Bạn phải nộp hồ sơ rồi mới tra cứu được
							thông tin hồ sơ.
						</h3>
					</>
				)}
			</div>
		</>
	);
}

export default TraCuuHoSo;
