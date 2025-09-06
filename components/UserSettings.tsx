/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import Modal from './Modal';
import { useUI, useUser } from '@/lib/state';

export default function UserSettings() {
  const { name, info, setName, setInfo } = useUser();
  const { setShowUserConfig } = useUI();

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