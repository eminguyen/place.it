import { ADD_DATA, CLEAR_DATA, UPDATE_TOTAL } from '../actions/types';

const initialState = {
  grade: '?',
  score: -1,
  trees: 0,
  carbon: 0,
  crimes: 0,
  num: 0,
  propVal: 0,
  tax: 0,
  parking: 0,
  tips: [],
  transitGrade: '',
  walkingGrade: '',
  data: []
};

const DataReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_TOTAL:
      return {
        ...state,
        grade: action.payload.grade,
        score: action.payload.score,
        trees: action.payload.trees,
        carbon: action.payload.carbon,
        crimes: action.payload.crimes,
        propVal: action.payload.propVal,
        num: action.payload.num,
        tax: action.payload.tax,
        parking: action.payload.parking,
        tips: action.payload.tips,
        transitGrade: action.payload.transitGrade,
        walkingGrade: action.payload.walkingGrade
      }
    case ADD_DATA:
      const data = {
        type: action.payload.type,
        name: action.payload.name,
        length: action.payload.length,
        width: action.payload.width,
        height: action.payload.height,
        color: action.payload.color,
        score: action.payload.score,
        treeScore: action.payload.treeScore,
        carbonScore: action.payload.carbonScore,
        transitScore: action.payload.transitScore,
        parkingScore: action.payload.parkingScore,
        crimeScore: action.payload.crimeScore,
        houseScore: action.payload.houseScore,
        lat: action.payload.lat,
        lng: action.payload.lng
      }

      return {
        ...state,
        data: [...state.data, data]
      }
    case CLEAR_DATA:
      return {
        ...state,
        data: []
      }
  default:
      return state;
  }
};

export default DataReducer;
