
const initState = {
  number: 0
};
export const StudyReducer = (state = initState, action: any) => {
    console.log(action);
    switch (action.type) {
        case "addCount":
            return {...state,number : action.number+1};
        case "subtractCount":
            return {...state,number : action.number-1};
        default:
            return {...state};
    }
};