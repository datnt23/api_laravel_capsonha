import "./App.css";
import { Route, Routes } from "react-router-dom";
import NopHoSo from "./page/NopHoSo";
import ChuyenVien from "./page/ChuyenVien";
import TraCuuHoSo from "./page/TraCuuHoSo";
import Home from "./page/Home";
import XemXetHoSo from "./page/XemXetHoSo";
import TruongPhong from "./page/TruongPhong";
import Duyet from "./page/Duyet";
import Login from "./page/Login";
import Register from "./page/Register";
function App() {
	return (
		<div className="app">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/tracuuhoso" element={<TraCuuHoSo />} />
				<Route path="/nophoso" element={<NopHoSo />} />
				<Route path="/chuyenvien" element={<ChuyenVien />} />
				<Route path="/chuyenvien/xemxet" element={<XemXetHoSo />} />
				<Route path="/truongphong" element={<TruongPhong />} />
				<Route path="/truongphong/duyet" element={<Duyet />} />
			</Routes>
		</div>
	);
}

export default App;
