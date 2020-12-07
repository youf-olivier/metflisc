import { useReducer, useEffect, useCallback, useRef, Dispatch } from 'react';

export enum StatusEnum {
  PENDING = 'pending',
  RESOLVED = 'resolved',
  ERROR = 'error',
  IDLE = 'idle',
}
export type StatusType = keyof typeof StatusEnum;
export type Action = { type: StatusType; error?: string; data?: any };
export type StatusState = {
  status: StatusType;
  error?: string;
  data: any;
};

const fetchStateReducer = (state: StatusState, action: Action): StatusState => {
  switch (action.type) {
    case 'ERROR': {
      return {
        ...state,
        status: 'ERROR',
        error: action.error,
        data: undefined,
      };
    }
    case 'RESOLVED': {
      return {
        ...state,
        status: 'RESOLVED',
        data: action.data,
        error: undefined,
      };
    }
    case 'PENDING': {
      return {
        ...state,
        status: 'PENDING',
        data: undefined,
        error: undefined,
      };
    }
    default: {
      return state;
    }
  }
};

// Utilisé pour eviter de metre a jour un état si on change de page
const useSafeDispatch = (dispatch: Dispatch<Action>): Dispatch<Action> => {
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return useCallback(
    // eslint-disable-next-line no-void
    args => (mountedRef.current ? dispatch(args) : void 0),
    [dispatch],
  );
};

export const useAsync = () => {
  const [state, unsafeDispatch] = useReducer(fetchStateReducer, {
    status: 'IDLE',
    error: undefined,
    data: undefined,
  });

  const dispatch = useSafeDispatch(unsafeDispatch);

  const { data, error, status } = state;

  const run = useCallback(
    promise => {
      dispatch({ type: 'PENDING' });
      promise.then(
        (result: any) => {
          dispatch({ type: 'RESOLVED', data: result });
        },
        (err: string) => {
          dispatch({ type: 'ERROR', error: err });
        },
      );
    },
    [dispatch],
  );

  return {
    error,
    status,
    data,
    run,
  };
};
