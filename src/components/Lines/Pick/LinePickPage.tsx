import React from "react";
import { useSelector } from 'react-redux';
import { getIsFetching } from "../../../Redux/lines-selector";
import Preloader from "../../Common/Preloader/Preloader";
import { LinesPick } from "./LinesPick";

type PropsType = {}

export const LinePickPage: React.FC<PropsType> = () => {
    const isFetching = useSelector(getIsFetching)

    return <>
        {isFetching ? <Preloader /> : null}
        <LinesPick />
    </>
}