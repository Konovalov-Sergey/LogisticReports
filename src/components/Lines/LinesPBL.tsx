
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requesPblLines } from "../../Redux/lines-reducer";
import { getPblLines } from './../../Redux/lines-selector';

type PropsType = {}


export const LinesPBL: React.FC<PropsType> = () => {
    
    const pblLines = useSelector(getPblLines);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch<any>(requesPblLines())
    }, [])

    return (
        <div>
            <h2>Lines PBL</h2>
        </div>
    )
}