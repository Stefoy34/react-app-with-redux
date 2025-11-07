/*
 * Skenario Pengujian untuk Thunks (threads)
 *
 * - Kriteria 1.2 (Tes #1)
 * - asyncReceiveThreads thunk
 * - Harap men-dispatch action (showLoading, receiveThreads, hideLoading) dengan benar
 * ketika pengambilan data sukses.
 * - Harap memanggil alert jika pengambilan data gagal.
 *
 * - Kriteria 1.2 (Tes #2 - Kompleks)
 * - asyncToggleUpVoteThread thunk (Optimistic)
 * - Harap men-dispatch action (upVoteThreadActionCreator) secara optimis.
 * - Harap memanggil api.upVoteThread setelah dispatch optimis.
 * - Harap men-dispatch action rollback (neutralizeVoteThreadActionCreator)
 * dan memanggil alert jika API gagal.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { showLoading, hideLoading } from '@dimasmds/react-redux-loading-bar';
import api from '../../utils/api';
import {
  asyncReceiveThreads,
  receiveThreadsActionCreator,
  asyncToggleUpVoteThread,
  upVoteThreadActionCreator,
  neutralizeVoteThreadActionCreator,
} from './action';

vi.mock('../../utils/api', () => ({
  default: {
    getAllThreads: vi.fn(),
    upVoteThread: vi.fn(),
  },
}));

vi.mock('@dimasmds/react-redux-loading-bar', () => ({
  showLoading: vi.fn(),
  hideLoading: vi.fn(),
}));

global.alert = vi.fn();

describe('Thunks (threads)', () => {
  let dispatch;
  let getState;

  beforeEach(() => {
    dispatch = vi.fn();
    getState = vi.fn();
    global.alert.mockClear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('asyncReceiveThreads', () => {
    it('harus men-dispatch action dengan benar saat fetch sukses', async () => {
      const fakeThreads = [{ id: 'thread-1' }];
      api.getAllThreads.mockResolvedValue(fakeThreads);

      await asyncReceiveThreads()(dispatch);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(receiveThreadsActionCreator(fakeThreads));
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it('harus memanggil alert saat fetch gagal', async () => {
      const error = new Error('Gagal fetch');
      api.getAllThreads.mockRejectedValue(error);

      await asyncReceiveThreads()(dispatch);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(global.alert).toHaveBeenCalledWith(error.message);
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
  });

  describe('asyncToggleUpVoteThread', () => {
    it('harus men-dispatch optimis dan rollback jika API gagal', async () => {
      const fakeError = new Error('API Gagal');
      const authUser = { id: 'user-1' };
      const threads = [{ id: 'thread-1', upVotesBy: [], downVotesBy: [] }];

      getState.mockReturnValue({ authUser, threads });
      api.upVoteThread.mockRejectedValue(fakeError);

      await asyncToggleUpVoteThread('thread-1')(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith(
        upVoteThreadActionCreator({ threadId: 'thread-1', userId: 'user-1' }),
      );
      
      expect(api.upVoteThread).toHaveBeenCalledWith('thread-1');
      
      expect(global.alert).toHaveBeenCalledWith(fakeError.message);
      
      expect(dispatch).toHaveBeenCalledWith(
        neutralizeVoteThreadActionCreator({ threadId: 'thread-1', userId: 'user-1' }),
      );
    });
  });
});
