import MenuState from "../../state/MenuState";
import {MENU_ACTION_TYPE} from "../../actions/ActionTypes";

export const MenuReducer = (state = MenuState, action: any) => {
    switch (action.type) {
        case MENU_ACTION_TYPE:
            return {...state};
        default:
            return {...state};
    }
};