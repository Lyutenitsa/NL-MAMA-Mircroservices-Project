// Store
import {useState as useStateHook} from '@hookstate/core';
import store from '../store/store';

const useLoggedIn = () => {
    const {loginState} = useStateHook(store);

    if (loginState.get()) {
        return true;
    }
    return false;
}

export default useLoggedIn;