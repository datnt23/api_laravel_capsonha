import {
	SET_DATA,
	SET_DATA_HOSO,
	SET_DATA_PHUONG,
	SET_DATA_QUAN,
} from "./Constants";
const initState = {
	//Data:---------------------------------------------------
	dataQuan: [],
	dataPhuong: [],
	dataHoSo: {},
	data: [],
};
function Reducer(state, action) {
	switch (action.type) {
		//Data:----------------------------
		case SET_DATA_QUAN:
			return {
				...state,
				dataQuan: action.payload,
			};
		case SET_DATA_PHUONG:
			return {
				...state,
				dataPhuong: action.payload,
			};
		case SET_DATA_HOSO:
			return {
				...state,
				dataHoSo: action.payload,
			};
		case SET_DATA:
			return {
				...state,
				data: action.payload,
			};
		default:
			throw new Error("Invalid Actions!");
	}
}
export { initState };
export default Reducer;
