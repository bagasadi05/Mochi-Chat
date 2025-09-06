/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { useMetrics } from '@/lib/metrics';

export default function LatencyIndicator() {
  const { latency } = useMetrics();

  if (latency === 0) {
    return null;
  }

  return <div className="latency-indicator">Latensi: {latency}md</div>;
}