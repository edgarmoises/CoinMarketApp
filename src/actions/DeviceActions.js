import {
    IS_LANDSCAPE
} from './types';

export const deviceOrientation = ({isLandscape}) => {
    return({
        type: IS_LANDSCAPE,
        payload: isLandscape
    })
}