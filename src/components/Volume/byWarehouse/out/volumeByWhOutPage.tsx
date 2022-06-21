
import { useSelector } from 'react-redux';
import { getIsFetching } from '../../../../Redux/volume-selector';
import Preloader from '../../../Common/Preloader/Preloader';

import { VolumeByWhOut } from './volumeByWhOut';

type PropsType = {}

export const VolumeByWhOutPage: React.FC<PropsType> = () => {
    const isFetching = useSelector(getIsFetching)
    return <div>
         {isFetching? <Preloader /> : null}
        <VolumeByWhOut />
    </div>
}