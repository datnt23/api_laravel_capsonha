import { actions, useStore } from "../store";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import axios from "axios";
import Map, {
    FullscreenControl,
    GeolocateControl,
    Marker,
    NavigationControl,
    ScaleControl,
} from "react-map-gl";
function Duyet() {
    const [state, dispatch] = useStore();
    const { dataHoSo } = state;
    const id = dataHoSo.get_chi_tiet_ho_so.id;
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const markerRef = useRef();
    const handleSubmit = async () => {
        try {
            const response = await axios({
                method: "PUT",
                url: `${
                    import.meta.env.VITE_LOCAL_HOST
                }/truong_phong/capnhatketqua/${id}`,
                headers: {
                    Authorization: `Bearer ${state.data[0].token}`,
                },
            });
            if (response.status === 200) {
                window.alert("Hồ sơ đã duyệt!");
            }
            navigate("/truongphong");
        } catch (error) {
            console.log(error);
        }
    };
    const handleClick = async () => {
        try {
            const response = await axios({
                method: "PUT",
                url: `${
                    import.meta.env.VITE_LOCAL_HOST
                }/truong_phong/tralaihoso/${id}`,
                data: {
                    loi_nhan: message,
                },
                headers: {
                    Authorization: `Bearer ${state.data[0].token}`,
                },
            });
            if (response.status === 200) {
                window.alert("Đã trả lại hồ sơ cho chuyên viên xử lý!");
            }
            navigate("/truongphong");
        } catch (error) {
            console.log(error);
        }
    };
    const handleLBack = () => {
        dispatch(actions.setDataHoSo({}));
        navigate("/truongphong");
    };
    return (
        <div>
            <div>
                <h1>Xem Xét Hồ Sơ Đã Thụ Lý</h1>
                <button onClick={handleLBack}>Quay lại</button>
                <div>Mã hồ sơ: {dataHoSo.id}</div>
                <div>Họ tên chủ hộ: {dataHoSo.ho_ten_chu_ho}</div>
                <div>Số tờ: {dataHoSo.so_to}</div>
                <div>Số thửa: {dataHoSo.so_thua}</div>
                <div>
                    {dataHoSo.get_phuong.name}, {dataHoSo.get_quan.name}
                </div>
                <div>
                    Trạng thái:{" "}
                    {dataHoSo.get_chi_tiet_ho_so.get_trang_thai.ten_trang_thai}
                </div>
                <div>
                    Ý kiến của chuyên viên:{" "}
                    {dataHoSo.get_chi_tiet_ho_so.noi_dung}
                </div>
                <div>
                    Tọa độ VN2000: {dataHoSo.get_chi_tiet_ho_so.toa_do_x},{" "}
                    {dataHoSo.get_chi_tiet_ho_so.toa_do_y}
                </div>
                <br />
                <button onClick={handleSubmit}>Duyệt</button>
                <div>Lời nhắn:</div>
                <textarea
                    cols="40"
                    rows="4"
                    value={message}
                    placeholder={"Xử lý..."}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <br />
                <button onClick={handleClick}>Trả lại</button>
            </div>
            <div className="div-map">
                <Map
                    style={{ width: 600, height: 400, margin: 20 }}
                    initialViewState={{
                        longitude: dataHoSo.get_chi_tiet_ho_so.toa_do_x,
                        latitude: dataHoSo.get_chi_tiet_ho_so.toa_do_y,
                        zoom: 16,
                    }}
                    mapStyle="mapbox://styles/mapbox/streets-v9"
                    mapboxAccessToken={`${import.meta.env.VITE_MAP_TOKEN}`}
                >
                    <NavigationControl position="top-left" />
                    <FullscreenControl position="top-left" />
                    <GeolocateControl position="top-left" />
                    <ScaleControl />
                    <Marker
                        longitude={dataHoSo.get_chi_tiet_ho_so.toa_do_x}
                        latitude={dataHoSo.get_chi_tiet_ho_so.toa_do_y}
                        key={markerRef}
                    />
                </Map>
            </div>
        </div>
    );
}

export default Duyet;
