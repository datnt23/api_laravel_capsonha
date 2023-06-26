import { Link } from "react-router-dom";
import { useStore } from "../store";
import ChuyenVien from "./ChuyenVien";
import TruongPhong from "./TruongPhong";

function Home() {
    const [state, dispatch] = useStore();
    const { data } = state;
    const handleClick = () => {
        localStorage.removeItem("token");
    };
    return (
        <>
            {!data.length ? (
                <li>
                    <Link to={"/login"} onClick={handleClick}>
                        Đăng nhập
                    </Link>
                    <h1>Đăng nhập trước khi tra cứu hoặc nộp hồ sơ!.</h1>
                </li>
            ) : data[0].role.id[0] === 1 ? (
                <TruongPhong />
            ) : data[0].role.id[0] === 2 ? (
                <ChuyenVien />
            ) : (
                <>
                    <li>
                        <Link to={"/tracuuhoso"}>Tra Cứu Hồ Sơ</Link>
                    </li>
                    <li>
                        <Link to={"/nophoso"}>Nộp Hồ Sơ</Link>
                    </li>
                    <li>
                        <Link to={"/login"} onClick={handleClick}>
                            Đăng xuất
                        </Link>
                    </li>
                    <h1>Ấn vào nộp hồ sơ để cấp số nhà.</h1>
                    <h1>Hoặc ấn vào tra cứu hồ sơ khi đã nộp hồ sơ!</h1>
                </>
            )}
        </>
    );
}

export default Home;
