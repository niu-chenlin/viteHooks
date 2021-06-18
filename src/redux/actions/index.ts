import {VIEW_LOADING} from "./ActionTypes";

/**
 * redux loading的action生成器
 * @param value
 */
export const showViewLoadingStatusAction = (value: boolean) => {
    return {
        type: VIEW_LOADING,
        payload: {
            loading: value
        }
    }
};

export const add = (count: number) => {
    return {
        type: "addCount",
        number: count
    }
    // return (dispatch: any) => {
    //     (() => {
    //         console.log('123',count);
    //         dispatch({
    //             type : 'addCount',
    //             count
    //         })
    //     })();
    // }
};

export const reduce = (count: number) => {
    return {
        type: "subtractCount",
        number: count
    }
    // return (dispatch: any) => {
    //     (() => {
    //         console.log('123',count);
    //         dispatch({
    //             type : 'reduceCount',
    //             count
    //         })
    //     })();
    // }
};