/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { useRef } from 'react';
import {
  Agent,
  AGENT_COLORS,
  INTERLOCUTOR_VOICE,
  INTERLOCUTOR_VOICES,
} from '@/lib/presets/agents';
import Modal from './Modal';
import c from 'classnames';
import { useAgent, useUI } from '@/lib/state';

export default function EditAgent() {
  const agent = useAgent(state => state.current);
  const updateAgent = useAgent(state => state.update);
  const nameInput = useRef(null);
  const { setShowAgentEdit } = useUI();

  function onClose() {
    setShowAgentEdit(false);
  }

  function updateCurrentAgent(adjustments: Partial<Agent>) {
    updateAgent(agent.id, adjustments);
  }

  return (
    <Modal onClose={() => onClose()}>
      <div className="editAgent">
        <form>
          <input
            className="largeInput"
            type="text"
            placeholder="Nama"
            value={agent.name}
            onChange={e => updateCurrentAgent({ name: e.target.value })}
            ref={nameInput}
          />

          <label>
            Kepribadian
            <textarea
              value={agent.personality}
              onChange={e =>
                updateCurrentAgent({ personality: e.target.value })
              }
              rows={7}
              placeholder="Bagaimana saya harus bersikap? Apa tujuan saya? Bagaimana Anda menggambarkan kepribadian saya?"
            />
          </label>
        </form>

        <div className="customization-section">
          <p>Warna</p>
          <ul className="colorPicker">
            {AGENT_COLORS.map((color, i) => (
              <li key={i} className={c({ active: color === agent.bodyColor })}>
                <button
                  style={{ backgroundColor: color }}
                  onClick={() => updateCurrentAgent({ bodyColor: color })}
                  aria-label={`Set agent color to ${color}`}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="customization-section voicePicker">
          <p>Suara</p>
          <select
            value={agent.voice}
            onChange={e =>
              updateCurrentAgent({
                voice: e.target.value as INTERLOCUTOR_VOICE,
              })
            }
          >
            {INTERLOCUTOR_VOICES.map(voice => (
              <option key={voice} value={voice}>
                {voice}
              </option>
            ))}
          </select>
        </div>

        <button onClick={() => onClose()} className="button primary">
          Selesai
        </button>
      </div>
    </Modal>
  );
}