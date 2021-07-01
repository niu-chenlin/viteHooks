import React, {MouseEventHandler, useState} from 'react';
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

const countNumber = (initNumber: any) => (WrappedComponent: any) => {
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
    }
    // 1.高阶组件会创造一个新的组件，当程序报错的时候，出现在异常信息里的会是这个新创建的组件而不是原本的无状态组件
    // 解决这个问题的方法是给高阶组件设置displayName
    // 2.高阶组件的优点虽然是链式调用，但是链式调用过多的话，会生成很长的异常栈，导致错误难以定位。
    // 3.高阶组件第三个缺点也是最大的缺点，就是属性被写死了。如果子组件需求的属性名写得不一样，高阶组件就无能为力了。比如上面的Count组件，接受了count,add,minus这个三个属性，
    // 但如果另一个组件需要的是num,addNum,minusNum这三个属性呢？两个组件明明需要相同的功能，逻辑却没法在这里复用了。
    // 所以在一般情况下，我们会优先考虑renderProps的模式。
    // @ts-ignore
    CountNumber['displayName'] = `changeTheme(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
    return CountNumber;
};


export const ComponentHOC = countNumber(0)(Count);


function countNumber1(initNumber: number) {
    const [count, setCount] = useState(initNumber);
    const addCount = () => setCount(count+1);
    const minusCount = () => setCount(count-1); // : MouseEventHandler
    return [count, addCount, minusCount]
}
export const HooksCount: React.FC<{}> = () => {
    const [count, addCount, minusCount] = countNumber1(0); // 状态逻辑的复用
    return (<div>
        <p>this is value {count}</p>
        <button onClick={addCount as MouseEventHandler}>Add</button>
        <button onClick={minusCount as MouseEventHandler}>Subsc</button>
    </div>)
}