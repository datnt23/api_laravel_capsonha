import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { actions, useStore } from "../store";

function NopHoSo() {
    const [selectedQuan, setSelectedQuan] = useState();
    const [selectedPhuong, setSelectedPhuong] = useState();
    const [name, setName] = useState("");
    const [soThua, setSoThua] = useState("");
    const [soTo, setSoTo] = useState("");
    const [state, dispatch] = useStore();
    const { dataQuan, dataPhuong, data } = state;
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios({
                    method: "GET",
                    url: `${import.meta.env.VITE_LOCAL_HOST}/user/quan`,
                    headers: {
                        Authorization: `Bearer ${data[0].token}`,
                    },
                });
                dispatch(actions.setDataQuan(response.data));
                setSelectedQuan(response.data[0].id);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);
    useEffect(() => {
        const postData = async () => {
            try {
                const response = await axios({
                    method: "GET",
                    url: `${
                        import.meta.env.VITE_LOCAL_HOST
                    }/user/quan/${selectedQuan}/phuong`,
                    headers: {
                        Authorization: `Bearer ${data[0].token}`,
                    },
                });
                dispatch(actions.setDataPhuong(response.data));
                setSelectedPhuong(response.data[0].id);
            } catch (error) {
                console.log(error);
            }
        };
        postData();
    }, [selectedQuan]);
    const handleSubmit = async () => {
        try {
            const response = await axios({
                method: "POST",
                url: `${import.meta.env.VITE_LOCAL_HOST}/user/hoso`,
                data: {
                    ho_ten_chu_ho: name,
                    so_to: soTo,
                    so_thua: soThua,
                    id_phuong: selectedPhuong,
                    id_quan: selectedQuan,
                },
                headers: {
                    Authorization: `Bearer ${data[0].token}`,
                },
            });
            if (response.status === 201) {
                setName("");
                setSoTo("");
                setSoThua("");
                setSelectedPhuong(dataPhuong[0].id);
                setSelectedQuan(dataQuan[0].id);
                window.alert(
                    "Created! " +
                        "\n" +
                        "Mã hồ sơ là: " +
                        response.data.ma_ho_so
                );
                navigate("/tracuuhoso");
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <li>
                <Link to={"/"}>Home</Link>
            </li>
            <li>
                <Link to={"/tracuuhoso"}>Tra Cứu Hồ Sơ</Link>
            </li>
            <div>Nộp Hồ Sơ</div>
            <div className="row">
                <div className="col-4">Họ tên chủ hộ:</div>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="row">
                <div className="col-4">Số tờ:</div>
                <input
                    type={"number"}
                    value={soTo}
                    onChange={(e) => setSoTo(e.target.value)}
                />
            </div>
            <div className="row">
                <div className="col-4">Số thửa:</div>
                <input
                    type={"number"}
                    value={soThua}
                    onChange={(e) => setSoThua(e.target.value)}
                />
            </div>
            <div className="row">
                <div className="col-4">Phường:</div>
                <select
                    value={selectedPhuong}
                    onChange={(e) => setSelectedPhuong(e.target.value)}
                >
                    {dataPhuong.length ? (
                        dataPhuong.map((obj, index) => (
                            <option key={index} value={obj.id}>
                                {obj.name}
                            </option>
                        ))
                    ) : (
                        <option value="default" selected>
                            Default Option
                        </option>
                    )}
                </select>
            </div>
            <div className="row">
                <div className="col-4">Quận:</div>
                <select
                    value={selectedQuan}
                    onChange={(e) => setSelectedQuan(e.target.value)}
                >
                    {dataQuan.length ? (
                        dataQuan.map((obj, index) => (
                            <option key={index} value={obj.id}>
                                {obj.name}
                            </option>
                        ))
                    ) : (
                        <option value="default" selected>
                            Default Option
                        </option>
                    )}
                </select>
            </div>
            <button onClick={handleSubmit}>Nộp Hồ Sơ</button>
        </div>
    );
}

export default NopHoSo;
