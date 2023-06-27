import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { actions, useStore } from "../store";
import Map, {
    FullscreenControl,
    GeolocateControl,
    Marker,
    NavigationControl,
    ScaleControl,
    useMap,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useRef } from "react";

function XemXetHoSo() {
    const [state, dispatch] = useStore();
    const [content, setContent] = useState("");
    const [toaDoX, setToaDoX] = useState("");
    const [toaDoY, setToaDoY] = useState("");
    const navigate = useNavigate();
    const { dataHoSo } = state;
    const [view, setView] = useState();
    const [marker, setMarker] = useState({
        longitude: 0,
        latitude: 0,
    });
    const markerRef = useRef();
    const mapRef = useMap();
    const id = dataHoSo.get_chi_tiet_ho_so.id;
    const trang_thai = dataHoSo.get_chi_tiet_ho_so.id_trang_thai;
    useEffect(() => {
        if (trang_thai === 4) {
            setToaDoX(dataHoSo.get_chi_tiet_ho_so.toa_do_x);
            setToaDoY(dataHoSo.get_chi_tiet_ho_so.toa_do_y);
            setContent(dataHoSo.get_chi_tiet_ho_so.noi_dung);
        }
    }, []);
    const handleSubmit = async () => {
        try {
            const response = await axios({
                method: "PUT",
                url: `${
                    import.meta.env.VITE_LOCAL_HOST
                }/chuyen_vien/capnhattrangthai/${id}`,
                data: {
                    noi_dung: content,
                    toa_do_x: `${toaDoX}`,
                    toa_do_y: `${toaDoY}`,
                },
                headers: {
                    Authorization: `Bearer ${state.data[0].token}`,
                },
            });
            if (response.status === 200) {
                window.alert("Hồ sơ sẽ được duyệt từ Trưởng phòng!");
            }
            navigate("/chuyenvien");
        } catch (error) {
            console.log(error);
        }
    };
    const handleLBack = () => {
        dispatch(actions.setDataHoSo({}));
        navigate("/chuyenvien");
    };
    const handleClickMap = (event) => {
        const longitude = event.lngLat.lng;
        const latitude = event.lngLat.lat;
        setToaDoX(longitude);
        setToaDoY(latitude);
        setMarker({
            longitude: longitude,
            latitude: latitude,
        });
        setView({
            longitude: longitude,
            latitude: latitude,
            zoom: 16,
        });
    };
    const handleFindPosition = () => {
        setMarker({
            longitude: toaDoX,
            latitude: toaDoY,
        });
        setView({
            longitude: toaDoX,
            latitude: toaDoY,
            zoom: 16,
        });
    };
    useEffect(() => {
        if (view) {
            mapRef.current.flyTo({ center: [view.longitude, view.latitude] });
        }
    }, [view]);

    return (
        <div>
            <div>
                <h1>Xem Xét Hồ Sơ Đang Thụ Lý</h1>
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
                {dataHoSo.get_chi_tiet_ho_so.loi_nhan ? (
                    <div>Lời nhắn: {dataHoSo.get_chi_tiet_ho_so.loi_nhan}</div>
                ) : (
                    <></>
                )}
                <div>Ý kiến của chuyên viên:</div>
                <textarea
                    cols="40"
                    rows="4"
                    value={content}
                    placeholder={
                        "Đồng ý cấp số nhà là xx/yy đường zzz. Hoặc, Không đồng ý cấp vì lý do..."
                    }
                    onChange={(e) => setContent(e.target.value)}
                />
                <div>Nhập thông tin tọa độ (X và Y hệ VN2000):</div>
                <textarea
                    cols="20"
                    rows="1"
                    value={toaDoX}
                    placeholder={"Nhập tọa độ X..."}
                    onChange={(e) => setToaDoX(e.target.value)}
                />
                <textarea
                    cols="20"
                    rows="1"
                    value={toaDoY}
                    placeholder={"Nhập tọa độ Y..."}
                    onChange={(e) => setToaDoY(e.target.value)}
                />
                <button onClick={handleFindPosition}>Tìm Vị Trí</button>
                <br />
                <button onClick={handleSubmit}>Chuyển</button>
            </div>
            <div className="div-map">
                <Map
                    ref={mapRef}
                    style={{ width: 600, height: 400, margin: 20 }}
                    initialViewState={{
                        longitude: 106.69591226032946,
                        latitude: 10.777631776676856,
                        zoom: 16,
                    }}
                    mapStyle="mapbox://styles/mapbox/streets-v9"
                    mapboxAccessToken={`${import.meta.env.VITE_MAP_TOKEN}`}
                    onClick={handleClickMap}
                >
                    <NavigationControl position="top-left" />
                    <FullscreenControl position="top-left" />
                    <GeolocateControl position="top-left" />
                    <ScaleControl />
                    <Marker
                        longitude={marker.longitude}
                        latitude={marker.latitude}
                        key={markerRef}
                    />
                </Map>
            </div>
        </div>
    );
}

export default XemXetHoSo;
