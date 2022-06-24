import { useContext } from 'react';
import ConfirmContext from '../context/confirmcontext';
import {HIDE_CONFIRM, SHOW_CONFIRM} from "../reducer/confirmreducer";

let resolveCallback;
function useConfirm() {
    const [confirmState, dispatch] = useContext(ConfirmContext);
    const onConfirm = () => {
        closeConfirm();
        resolveCallback(true);
    };

    const onCancel = () => {
        closeConfirm();
        resolveCallback(false);
    };
    const confirm = text => {
        dispatch({
            type: SHOW_CONFIRM,
            payload: {
                text
            }
        });

        return new Promise((res, rej) => {
            console.log("response",res)
            resolveCallback = res;
        });
    };

    const closeConfirm = () => {
        dispatch({
            type: HIDE_CONFIRM
        });
    };

    return { confirm, onConfirm, onCancel, confirmState };
}

export default useConfirm;