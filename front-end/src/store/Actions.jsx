import {
	SET_DATA,
	SET_DATA_HOSO,
	SET_DATA_PHUONG,
	SET_DATA_QUAN,
} from "./Constants";
//-----------------------Set Data---------------------------//
export const setDataQuan = (payload) => ({
	type: SET_DATA_QUAN,
	payload,
});
export const setDataPhuong = (payload) => ({
	type: SET_DATA_PHUONG,
	payload,
});
export const setDataHoSo = (payload) => ({
	type: SET_DATA_HOSO,
	payload,
});
export const setData = (payload) => ({
	type: SET_DATA,
	payload,
});
