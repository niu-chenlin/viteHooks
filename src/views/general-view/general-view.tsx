import React, { useState } from 'react';
import {staticChangeLoading, staticChangeLoadingHOC} from "../../publicComponents/publicComponents";

export const GeneralView: React.FC<{}> = () => {
    console.log("general-view");
    // staticChangeLoading();
    return <div className="general-view">
        <p>this is general view</p>
    </div>
};

export const GeneralViewByHoc: React.FC<{}> = () => {
    console.log("general-view-hoc");
    console.log(GeneralView);
    const hoc = staticChangeLoadingHOC(GeneralView);
    console.log(hoc);
    // @ts-ignore
    return <hoc/>
};