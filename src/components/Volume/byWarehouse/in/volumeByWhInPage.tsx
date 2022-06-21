import React from 'react';
import Preloader from './../../../Common/Preloader/Preloader';
import { useSelector } from 'react-redux';
import { getIsFetching } from './../../../../Redux/volume-selector';
import { VolumeByWhIn } from './volumeByWhIn';

type PropsType = {}

export const VolumeByWhInPage: React.FC<PropsType> = () => {

    const isFetching = useSelector(getIsFetching)

    return (
        <div>
            {isFetching? <Preloader /> : null}
            <VolumeByWhIn />
        </div>

    )
}