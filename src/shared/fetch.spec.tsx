import { renderHook, act } from '@testing-library/react-hooks';

import { useXhr } from './fetch';

const fetchMockOk = jest.fn(() =>
  Promise.resolve({ ok: true, json: () => 'Ok result' }),
);
const fetchMockEmpty = jest.fn(() =>
  Promise.resolve({ ok: true, json: () => null }),
);
const fetchMockKo = jest.fn(() => Promise.reject(new Error('Error occured')));
const fetchMockStatusKo = jest.fn(() =>
  Promise.resolve({ ok: false, statusText: 'Erreur interne' }),
);
const fetchMockStatusKoWithoutStatusText = jest.fn(() =>
  Promise.resolve({ ok: false }),
);

const token = '23452345TOKEN bearer';
const url = '://url';
describe('useFetch tests suite ', () => {
  it('should callfetch wth correct params', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useXhr(url, token, fetchMockOk),
    );
    act(() => {
      result.current.get('endpoint/1');
    });
    expect(fetchMockOk).toBeCalledWith('://url/endpoint/1', {
      headers: {
        map: {
          accept: 'aplication/json',
          authorization: 'Bearer 23452345TOKEN bearer',
        },
      },
      method: 'GET',
    });
    expect(result.current.status).toEqual('PENDING');
    await waitForNextUpdate();
    expect(result.current.status).toEqual('RESOLVED');
  });

  it('should reject when response is empty', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useXhr(url, token, fetchMockEmpty),
    );
    act(() => {
      result.current.get('endpoint/1');
    });
    expect(result.current.status).toEqual('PENDING');
    await waitForNextUpdate();
    expect(result.current.status).toEqual('ERROR');
    expect(result.current.error.message).toEqual('Auncun résultat');
    expect(result.current.data).toBeUndefined();
  });

  it('should reject when response is on error', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useXhr(url, token, fetchMockKo),
    );
    act(() => {
      result.current.get('endpoint/1');
    });
    expect(result.current.status).toEqual('PENDING');
    await waitForNextUpdate();
    expect(result.current.status).toEqual('ERROR');
    expect(result.current.error.message).toEqual('Error occured');
    expect(result.current.data).toBeUndefined();
  });

  it('should reject when response is on Error ', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useXhr(url, token, fetchMockStatusKo),
    );
    act(() => {
      result.current.get('endpoint/1');
    });
    expect(result.current.status).toEqual('PENDING');
    await waitForNextUpdate();
    expect(result.current.status).toEqual('ERROR');
    expect(result.current.error.message).toEqual('Erreur interne');
    expect(result.current.data).toBeUndefined();
  });

  it('should reject when response is on Error with empty messsage', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useXhr(url, token, fetchMockStatusKoWithoutStatusText),
    );
    act(() => {
      result.current.get('endpoint/1');
    });
    expect(result.current.status).toEqual('PENDING');
    await waitForNextUpdate();
    expect(result.current.status).toEqual('ERROR');
    expect(result.current.error.message).toEqual('Une erreur est survenue');
    expect(result.current.data).toBeUndefined();
  });
});
