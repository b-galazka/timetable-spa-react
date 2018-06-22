import { REQUESTED, SUCCEEDED, FAILED } from '../constants/mobileAppData';

export function getMobileAppData() {

    return {
        type: REQUESTED
    };
}

export function fetchingMobileAppDataSuccess(payload) {

    return {
        type: SUCCEEDED,
        payload
    };
};

export function fetchingMobileAppDataFailure() {

    return {
        type: FAILED
    };
}