import { Dispatch } from 'redux';

import { setAppErrorAC, setAppStatusAC } from 'bll';
import { ResponseType } from 'dal';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const handleServerNetworkError = (
  error: { message: string },
  dispatch: Dispatch,
) => {
  dispatch(setAppErrorAC({ error: error.message }));
  dispatch(setAppStatusAC({ status: 'failed' }));
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const handleServerAppError = <T>(dispatch: Dispatch, data: ResponseType<T>) => {
  if (data.messages.length) {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    dispatch(setAppErrorAC({ error: data.messages[0] }));
  } else {
    dispatch(setAppErrorAC({ error: 'Unknown error' }));
  }
  dispatch(setAppStatusAC({ status: 'failed' }));
};
