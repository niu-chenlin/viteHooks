import * as React from "react"
import {useMemo, useState} from "react";

export const TestRenderView: React.FC<{}> = () => {
    console.log("TestRenderView");
    const [count, setCount] = useState(0);
    const [t, setT] = useState(0);
    const value = useMemo(() => {
        console.log("useMemo");
        for(let i = 0; i < 100; i++) {

        }
        return 100;
    }, [t]);
    return <div>
        <p>{count}</p><p>{value}</p>
        <button onClick={() => setCount(count+1)}>加一</button>
        <button onClick={() => setCount(count-1)}>-一</button>
    </div>
};