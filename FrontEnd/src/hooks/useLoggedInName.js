// Store
import {useState as useStateHook} from '@hookstate/core';
import store from '../store/store';

const useLoggedInName = () => {
    const {loginState} = useStateHook(store);

    if (loginState.get()) {
        return loginState.get().name;
    }
    return '';
}

export default useLoggedInName;