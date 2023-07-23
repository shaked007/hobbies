// src/store/usersReducer.js
const initialState = {
    usersData: [],
    loading:false,
  error:null

  };
  
  const usersReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_USERS_REQUEST':
        return {
          ...state,loading:true,error:null
        };
        case 'FETCH_USERS_SUCCESS':
          return {
            ...state,loading:false,usersData:action.payload
          };
          case 'FETCH_USERS_ERROR':
            return {
              ...state,loading:false,error:action.payload
            };
            case 'ADD_USER_START' :
              return {
                ...state,loading:true

              }
            case 'ADD_USER_SUCCESS':{
              return{
                ...state,loading:false,error:false,usersData:[...state.usersData,action.payload]
              }
            }
            case 'DELETE_USER':{
              const updatedUserArray = state.usersData.filter((user)=>user.id !== action.payload)
              return{
                ...state,loading:false,error:false,usersData:updatedUserArray
              }
            }
      default:
        return state;
    }
  };
  
  export default usersReducer;