/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { useEffect, useRef } from 'react';
import { Modality } from '@google/genai';

import BasicFace from '../basic-face/BasicFace';
import { useLiveAPIContext } from '../../../contexts/LiveAPIContext';
import { createSystemInstructions } from '@/lib/prompts';
import { useAgent, useUser } from '@/lib/state';
import PingIndicator from '../../PingIndicator';
import LatencyIndicator from '../../LatencyIndicator';
import { useMetrics } from '@/lib/metrics';

export default function KeynoteCompanion() {
  const { client, connected, setConfig, status } = useLiveAPIContext();
  const user = useUser();
  const { current, mode } = useAgent();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { setTurnStartTime } = useMetrics();

  // Set the configuration for the Live API
  useEffect(() => {
    setConfig({
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: { voiceName: current.voice },
        },
      },
      systemInstruction: {
        parts: [
          {
            text: createSystemInstructions(current, user, mode),
          },
        ],
      },
    });
  }, [setConfig, user, current, mode]);

  // Initiate the session when the Live API connection is established
  // Instruct the model to send an initial greeting message
  useEffect(() => {
    const beginSession = async () => {
      if (!connected) return;
      // Mulai timer latensi sebelum mengirim
      setTurnStartTime();
      client.send(
        {
          text: 'Sapa pengguna dengan hangat sesuai dengan kepribadianmu saat ini, perkenalkan dirimu sebagai Mochi, dan mulailah percakapan sesuai peranmu (baik sebagai teman curhat atau pacar). Jaga agar tetap singkat dan lembut.',
        },
        true
      );
    };
    beginSession();
  }, [client, connected, setTurnStartTime]);

  return (
    <div className="keynote-companion">
      <div className="status-indicators">
        <PingIndicator status={status} />
        <LatencyIndicator />
      </div>
      <div className="particle-background"></div>
      <BasicFace canvasRef={canvasRef} color={current.bodyColor} />
    </div>
  );
}