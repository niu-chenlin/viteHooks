import React, { useState } from 'react';
import {useDispatch} from "react-redux";
import {changeViewLoadingStatusAction} from "../redux/actions/index";
import {GLOBAL_STATIC_TIME} from "../util/global-bariable/GlobalBariable";

export const staticChangeLoading = () => {
    console.log("staticChangeLoading");
    const dispatch = useDispatch();
    dispatch(changeViewLoadingStatusAction(true));
    setTimeout(() => {
        dispatch(changeViewLoadingStatusAction(false));
    }, GLOBAL_STATIC_TIME)
};

// 高阶函数组件 - 为组件注入loading效果 - 高阶组件的参数原理上讲只应该是一个组件
export const staticChangeLoadingHOC = (WrappedComponent: any) => {
    console.log("staticChangeLoadingHOC");
    return <WrappedComponent/>
};

// @ts-ignore
function Count({count,add,minus}) {
    return (
        <div style={{flex:1,alignItems:'center',justifyContent:'center'}}>
            <p>You clicked {count} times</p>
            <button title={'add'} onClick={add}>1111</button>
            <button title={'minus'} onClick={minus}>2222</button>
            <button title={'ChangeTheme'}>3333</button>
        </div>
    );
}

const countNumber=(initNumber: any)=> (WrappedComponent: any)=>
    class CountNumber extends React.Component {
        state = {count: initNumber};

        add = () => this.setState({count: this.state.count + 1});

        minus = () => this.setState({count: this.state.count - 1});

        render() {
            return <WrappedComponent
                {...this.props}
                count={this.state.count}
                add={this.add.bind(this)}
                minus={this.minus.bind(this)}
            />
        }
    };

export const ComponentHOC = countNumber(0)(Count);

const TestCom: React.FC<{value: any, add: any, subsc: any}> = (props: any) => {
    return <div>
        <p>this is value {props.value}</p>
        <button onClick={props.add}>Add</button>
        <button onClick={props.subsc}>Subsc</button>
    </div>
};
const testComHOC = (initValue: any) => (WrappedComponent: any) => {
    const [value, setValue] = useState(initValue);
    return <WrappedComponent
        value={value}
        add={setValue(value + 1)}
        subsc={setValue(value - 1)}
    />
};
export const TestComponentHOC = testComHOC(0)(TestCom);
