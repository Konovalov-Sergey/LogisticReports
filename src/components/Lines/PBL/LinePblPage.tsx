import React from "react";
import { useSelector } from 'react-redux';
import { getIsFetching } from "../../../Redux/lines-selector";
import Preloader from "../../Common/Preloader/Preloader";
import { LinesPBL } from "./LinesPBL";

type PropsType = {}

export const LinePblPage: React.FC<PropsType> = () => {

    const isFetching = useSelector(getIsFetching)

    return <>
        {isFetching ? <Preloader /> : null }
        <LinesPBL />
    </>
}