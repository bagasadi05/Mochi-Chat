/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { useAgent, useUI, useUser } from '@/lib/state';

export default function Header() {
  const { showUserConfig, setShowUserConfig, setShowAgentEdit } = useUI();
  const { name } = useUser();
  const { current } = useAgent();

  return (
    <header>
      <div className="roomInfo">
        <button
          className="agent-edit-button"
          onClick={() => setShowAgentEdit(true)}
        >
          <h1>{current.name}</h1>
          <span className="icon">edit</span>
        </button>
      </div>
      <button
        className="userSettingsButton"
        onClick={() => setShowUserConfig(!showUserConfig)}
      >
        <p className="user-name">{name || 'Nama Anda'}</p>
        <span className="icon">tune</span>
      </button>
    </header>
  );
}