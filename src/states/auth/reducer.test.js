/*
 * Skenario Pengujian untuk authUserReducer
 *
 * - Kriteria 1.1 (Tes #1 - dari file ini)
 * - authUserReducer function
 * - Harap mengembalikan state awal (initial state) ketika diberikan action UNKNOWN.
 *
 * - Kriteria 1.1 (Tes #2 - dari file ini)
 * - authUserReducer function
 * - Harap mengembalikan authUser ketika diberikan action SET_AUTH_USER.
 * - Harap mengembalikan null ketika diberikan action UNSET_AUTH_USER.
 */

import { describe, it, expect } from 'vitest';
import authUserReducer from './reducer';
import { ActionType } from './action';

describe('authUserReducer function', () => {
  it('harus mengembalikan state awal jika action tidak dikenal', () => {
    const initialState = null;
    const action = { type: 'UNKNOWN' };

    const nextState = authUserReducer(initialState, action);

    expect(nextState).toBe(initialState);
  });

  it('harus mengembalikan authUser ketika diberikan action SET_AUTH_USER', () => {
    // Arrange
    const initialState = null;
    const authUser = { id: 'user-1', name: 'John Doe' };
    const action = {
      type: ActionType.SET_AUTH_USER,
      payload: { authUser },
    };

    const nextState = authUserReducer(initialState, action);

    expect(nextState).toEqual(authUser);
  });

  it('harus mengembalikan null ketika diberikan action UNSET_AUTH_USER', () => {
    const initialState = { id: 'user-1', name: 'John Doe' };
    const action = {
      type: ActionType.UNSET_AUTH_USER,
      payload: { authUser: null },
    };

    const nextState = authUserReducer(initialState, action);

    expect(nextState).toBeNull();
  });
});
