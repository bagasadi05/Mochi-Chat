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
// FIX: Add `update` to the agent store to allow updating the current agent's properties.
export const useAgent = create<{
  current: Agent;
  update: (id: string, adjustments: Partial<Agent>) => void;
}>(set => ({
  current: Mochi,
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