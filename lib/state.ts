/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { create } from 'zustand';
import { Agent, Mochi } from './presets/agents';

/**
 * User
 */
export type User = {
  name?: string;
  info?: string;
};

export const useUser = create<
  {
    setName: (name: string) => void;
    setInfo: (info: string) => void;
  } & User
>(set => ({
  name: '',
  info: '',
  setName: name => set({ name }),
  setInfo: info => set({ info }),
}));

/**
 * Agents
 */
export type AgentMode = 'curhat' | 'pacar';

export const useAgent = create<{
  current: Agent;
  mode: AgentMode;
  setMode: (mode: AgentMode) => void;
  update: (id: string, adjustments: Partial<Agent>) => void;
}>(set => ({
  current: Mochi,
  mode: 'curhat',
  setMode: mode =>
    set(state => {
      // Jika agen saat ini adalah Mochi, ubah warnanya berdasarkan mode
      if (state.current.id === 'mochi-confidant') {
        const newColor = mode === 'pacar' ? '#f538a0' : '#a142f4';
        return {
          mode,
          current: { ...state.current, bodyColor: newColor },
        };
      }
      return { mode };
    }),
  update: (id, adjustments) =>
    set(state => ({
      current:
        state.current.id === id
          ? { ...state.current, ...adjustments }
          : state.current,
    })),
}));

/**
 * UI
 */
// FIX: Add `showAgentEdit` and `setShowAgentEdit` to the UI store to manage the visibility of the agent edit modal.
export const useUI = create<{
  showUserConfig: boolean;
  setShowUserConfig: (show: boolean) => void;
  showAgentEdit: boolean;
  setShowAgentEdit: (show: boolean) => void;
}>(set => ({
  showUserConfig: true,
  setShowUserConfig: (show: boolean) => set({ showUserConfig: show }),
  showAgentEdit: false,
  setShowAgentEdit: (show: boolean) => set({ showAgentEdit: show }),
}));
