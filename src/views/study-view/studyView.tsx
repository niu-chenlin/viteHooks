import * as React from "react"
import {useSelector, useDispatch, useStore} from 'react-redux'
import { Table, Input, Button, Space } from 'antd'
import {add, reduce} from "../../redux/actions/index"
import {combineReducers} from "redux";
import {useCallback, useState} from "react"

export const StudyView: React.FC<{}> = () => {
    console.log("函数组件重新执行了...");
    // useSelector用于从Redux存储的state中提取值并订阅该state。这基本上类似于在hooks中实现的mapStateToProps函数
    // 但有一些小的差异:
    // 首先，不再提供ownProps API，并且应该使用useCallback或useMemo来通过自定义逻辑获取它们。
    // 其次，useSelector()第二个参数也是依赖数组，跟useEffect一样。如果不提供第二个参数，每次组件更新时都会重新计算；如果提供了依赖数组，只有依赖数组对应的值变更了之后，才会触发重新计算。
    // 除此之外，redux以前的性能优化逻辑同样保留了下来，如果当前的props跟老的props相同，则组件将不会重新渲染。
    // mapStateToProps实现：mapStateToProps = (state, ownProps) = {return {stateName: state.value, ...}}
    // useSelector实现：useSelector(state => {return {stateName: state.value, ...}})
    const count = useSelector((state: any) => {
        console.log(state); // 使用combineReducers分发后的store是一个数组
        return state[2].number;
    });
    // 由于React Redux中使用的批处理更新的逻辑，导致同一组件中的多个useSelector()重新计算出state，只会让组件重新渲染一次。因此，我们可以自由的在组件中useSelector()，而不用担心重复渲染的情况。在上面的例子中，
    // 我们可以将单个useSelector()分成两个独立的（一个读取title，另一个读取content）useSelector()，他们在性能和渲染数量方面完全相同。

    const dispatch = useDispatch();
    // 遗憾的是，如果我们想要在事件处理函数里面dispatch actions，必须创建一个匿名函数，如：() => dispatch(actionCreator)。
    // 注意：由于匿名函数的性质，这将在每次重新渲染时获得新的引用。因此，如果将这个匿名函数作为props传递给子组件组件，那么子组件将每次都重新渲染。
    // 为了优化性能，必须使该函数具有相同的引用，解决方案是在useCallback中创建这个匿名函数。
    const handleDispatchAdd = useCallback(() => dispatch(add(count)), [dispatch]); // 只有在dispatch改变时才
    const handleDispatchReduce = useCallback(() => dispatch(reduce(count)), [dispatch]);

    // useStore用于获取创建的store实例。在任何需要访问store的应用中，都可以通过usestore来获取。
    // const store = useStore();
    return <div>
        <span>{count}</span>
        <Button type="primary" onClick={handleDispatchAdd}>点击加一</Button>
        <Button type="primary" onClick={handleDispatchReduce}>点击减一</Button>
    </div>
};