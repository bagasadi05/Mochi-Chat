/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import Modal from './Modal';
import { useUI, useUser, useAgent } from '@/lib/state';
import { AgentMode } from '@/lib/state';

export default function UserSettings() {
  const { name, info, setName, setInfo } = useUser();
  const { setShowUserConfig } = useUI();
  const { mode, setMode } = useAgent();

  function updateClient() {
    setShowUserConfig(false);
  }

  return (
    <Modal onClose={() => setShowUserConfig(false)}>
      <div className="userSettings">
        <p>
          Selamat datang di Mochi. Ini adalah ruang aman bagi Anda untuk
          berbicara tentang apa pun yang ada di pikiran Anda. Saya di sini untuk
          mendengarkan tanpa menghakimi.
        </p>

        <form
          onSubmit={e => {
            e.preventDefault();
            setShowUserConfig(false);
            updateClient();
          }}
        >
          <div className="session-type-selector">
            <p>Pilih Jenis Sesi</p>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="session-type"
                  value="curhat"
                  checked={mode === 'curhat'}
                  onChange={() => setMode('curhat')}
                />
                <div className="radio-content">
                  <span className="radio-title">Sesi Curhat</span>
                  <span className="radio-description">
                    Mochi akan menjadi pendengar yang empatik dan sabar.
                  </span>
                </div>
              </label>
              <label>
                <input
                  type="radio"
                  name="session-type"
                  value="pacar"
                  checked={mode === 'pacar'}
                  onChange={() => setMode('pacar')}
                />
                <div className="radio-content">
                  <span className="radio-title">Ngobrol Santai</span>
                  <span className="radio-description">
                    Obrolan ringan layaknya dengan pacar yang ceria.
                  </span>
                </div>
              </label>
            </div>
          </div>

          <p>
            Menambahkan info ini membantu saya memahami Anda dengan lebih baik:
          </p>

          <div>
            <p>Nama Panggilan Anda</p>
            <input
              type="text"
              name="name"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Anda suka dipanggil apa?"
            />
          </div>

          <div>
            <p>Sedikit tentang Anda</p>
            <textarea
              rows={3}
              name="info"
              value={info}
              onChange={e => setInfo(e.target.value)}
              placeholder="Apa saja yang ingin Anda bagikan? Hobi, minat, atau apa pun yang membuat Anda menjadi diri Anda."
            />
          </div>

          <button className="button primary">Simpan</button>
        </form>
      </div>
    </Modal>
  );
}
