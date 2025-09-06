/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import c from 'classnames';
import { ConnectionStatus } from '@/hooks/media/use-live-api';

type PingIndicatorProps = {
  status: ConnectionStatus;
};

const statusMap: Record<ConnectionStatus, string> = {
  connecting: 'Menghubungkan...',
  connected: 'Terhubung',
  disconnected: 'Koneksi terputus',
};

export default function PingIndicator({ status }: PingIndicatorProps) {
  return (
    <div
      className={c('ping-indicator', `ping-indicator--${status}`)}
      role="status"
    >
      <svg
        width="24"
        height="20"
        viewBox="0 0 24 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect
          className="bar bar-1"
          x="3"
          y="12"
          width="3"
          height="6"
          rx="1.5"
        />
        <rect
          className="bar bar-2"
          x="8"
          y="8"
          width="3"
          height="10"
          rx="1.5"
        />
        <rect
          className="bar bar-3"
          x="13"
          y="4"
          width="3"
          height="14"
          rx="1.5"
        />
        <rect
          className="bar bar-4"
          x="18"
          y="0"
          width="3"
          height="18"
          rx="1.5"
        />
      </svg>
      <span className="sr-only">{statusMap[status]}</span>
    </div>
  );
}