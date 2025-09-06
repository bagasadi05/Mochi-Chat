/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { create } from 'zustand';

// Frekuensi pembaruan latensi yang ditampilkan (setiap N respons)
const LATENCY_UPDATE_FREQUENCY = 3;

type MetricsState = {
  latency: number;
  lastRequestTimestamp: number | null;
  responseCount: number;
  setTurnStartTime: () => void;
  recordResponseLatency: () => void;
};

export const useMetrics = create<MetricsState>(set => ({
  latency: 0,
  lastRequestTimestamp: null,
  responseCount: 0,

  /**
   * Mencatat waktu saat giliran pengguna dimulai (misalnya, saat AI selesai berbicara).
   */
  setTurnStartTime: () => set({ lastRequestTimestamp: Date.now() }),

  /**
   * Menghitung dan mencatat latensi saat respons pertama diterima.
   */
  recordResponseLatency: () =>
    set(state => {
      // Hanya hitung jika kita sedang menunggu respons
      if (state.lastRequestTimestamp === null) {
        return {};
      }

      const newLatency = Date.now() - state.lastRequestTimestamp;
      const newResponseCount = state.responseCount + 1;

      // Perbarui latensi yang ditampilkan hanya setiap LATENCY_UPDATE_FREQUENCY respons
      // untuk menghindari kedipan UI yang berlebihan.
      const shouldUpdateDisplay =
        newResponseCount % LATENCY_UPDATE_FREQUENCY === 0;

      return {
        responseCount: newResponseCount,
        latency: shouldUpdateDisplay ? newLatency : state.latency,
        // Atur ulang timestamp untuk giliran berikutnya
        lastRequestTimestamp: null,
      };
    }),
}));