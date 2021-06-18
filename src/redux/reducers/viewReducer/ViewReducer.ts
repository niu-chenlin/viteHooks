import ViewState from "../../state/ViewState";
import {VIEW_LOADING} from "../../actions/ActionTypes";

export const ViewReducer = (state = ViewState, action: any) => {
    switch (action.type) {
        case VIEW_LOADING:
            return {...state, loading: action.loading};
        default:
            return {...state}
    }
};