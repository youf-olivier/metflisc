import { renderHook, act } from '@testing-library/react-hooks';
import { useAsync } from './asyncHook';

describe('StatusContextProvider tests suite', () => {
  const okFetch = jest.fn(() => Promise.resolve('DATA RESULT'));
  const kofetch = jest.fn(() => Promise.reject(new Error('Error Occured')));
  it('should run promise and modify state', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAsync());
    const { run } = result.current;

    expect(result.current.status).toEqual('IDLE');
    act(() => {
      run(okFetch());
    });
    expect(result.current.status).toEqual('PENDING');
    await waitForNextUpdate();

    expect(result.current.status).toEqual('RESOLVED');
    expect(result.current.error).toBeUndefined();
    expect(result.current.data).toEqual('DATA RESULT');
  });

  it('should run promise and modify state', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAsync());
    const { run } = result.current;

    expect(result.current.status).toEqual('IDLE');
    act(() => {
      run(kofetch());
    });
    expect(result.current.status).toEqual('PENDING');
    await waitForNextUpdate();

    expect(result.current.status).toEqual('ERROR');
    expect(result.current.error.message).toEqual('Error Occured');
    expect(result.current.data).toEqual(undefined);
  });
});
