import type { OnRpcRequestHandler } from '@metamask/snaps-sdk';
import { Box, Text, Bold, Heading, Link } from '@metamask/snaps-sdk/jsx';

const API_KEY = 'soulo_gas_key_2026_p4m7x2_TredOIjNujwXz';
const API_URL = 'https://gasbuddycrypto.pro/api/gas';

interface GasData {
  slow: number;
  standard: number;
  fast: number;
}

async function fetchGas(network: string): Promise<GasData> {
  try {
    const response = await fetch(`${API_URL}?network=${network}&key=${API_KEY}`);
    if (!response.ok) {
      return { slow: 0, standard: 0, fast: 0 };
    }
    const data = await response.json();
    return {
      slow: data.slow || 0,
      standard: data.standard || 0,
      fast: data.fast || 0,
    };
  } catch (e) {
    return { slow: 0, standard: 0, fast: 0 };
  }
}

export const onRpcRequest: OnRpcRequestHandler = async ({ request }) => {
  switch (request.method) {
    case 'showGas': {
      const eth = await fetchGas('eth');
      const polygon = await fetchGas('polygon');
      const base = await fetchGas('base');

      return snap.request({
        method: 'snap_dialog',
        params: {
          type: 'alert',
          content: (
            <Box>
              <Heading>⛽ GasBuddy Crypto</Heading>
              <Text>Real-time gas tracker for 27 blockchains</Text>
              <Text> </Text>
              <Text>
                <Bold>🟦 Ethereum:</Bold> {eth.standard.toFixed(2)} Gwei
              </Text>
              <Text>
                <Bold>🟪 Polygon:</Bold> {polygon.standard.toFixed(2)} Gwei
              </Text>
              <Text>
                <Bold>⬜ Base:</Bold> {base.standard.toFixed(2)} Gwei
              </Text>
              <Text> </Text>
              <Text>
                🌐 <Link href="https://gasbuddycrypto.pro">Open GasBuddy Crypto</Link>
              </Text>
              <Text>
                🤖 <Link href="https://t.me/GasBuddy_Soulo_bot">Open Telegram Bot</Link>
              </Text>
            </Box>
          ),
        },
      });
    }
    default:
      throw new Error('Method not found.');
  }
};
