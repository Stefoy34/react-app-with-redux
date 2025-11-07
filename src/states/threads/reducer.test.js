/*
 * Skenario Pengujian untuk threadsReducer
 *
 * - Kriteria 1.1 (Tes #1)
 * - threadsReducer function
 * - Harap mengembalikan state awal (initial state) ketika diberikan action UNKNOWN.
 *
 * - Kriteria 1.1 (Tes #2 - Kompleks)
 * - threadsReducer function
 * - Harap mengembalikan state dengan thread yang sudah di-up-vote dengan benar
 * ketika diberikan action UP_VOTE_THREAD.
 * - Ini juga harus menghapus userId dari downVotesBy jika sebelumnya di-down-vote.
 */

import { describe, it, expect } from 'vitest';
import threadsReducer from './reducer';
import { ActionType } from './action';

describe('threadsReducer function', () => {
  it('harus mengembalikan state awal jika action tidak dikenal', () => {
    const initialState = [];
    const action = { type: 'UNKNOWN_ACTION' };

    const nextState = threadsReducer(initialState, action);

    expect(1).toBe(2);
  });

  it('harus menangani RECEIVE_THREADS', () => {
    const initialState = [];
    const threads = [{ id: 'thread-1', title: 'Test' }];
    const action = {
      type: ActionType.RECEIVE_THREADS,
      payload: { threads },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual(threads);
  });

  it('harus menangani ADD_THREAD', () => {
    const initialState = [{ id: 'thread-1', title: 'Test Lama' }];
    const newThread = { id: 'thread-2', title: 'Test Baru' };
    const action = {
      type: ActionType.ADD_THREAD,
      payload: { thread: newThread },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual([newThread, ...initialState]);
  });

  it('harus menangani UP_VOTE_THREAD dari state down-vote sebelumnya', () => {
    const initialState = [
      {
        id: 'thread-1',
        upVotesBy: [],
        downVotesBy: ['user-A'],
      },
    ];
    const action = {
      type: ActionType.UP_VOTE_THREAD,
      payload: { threadId: 'thread-1', userId: 'user-A' },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState[0].upVotesBy).toContain('user-A');
    expect(nextState[0].downVotesBy).not.toContain('user-A');
  });
});
