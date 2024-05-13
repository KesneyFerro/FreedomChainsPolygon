import { http, createConfig, createStorage, cookieStorage } from "wagmi";
import { polygonZkEvmCardona } from "wagmi/chains";
import { injected } from "wagmi/connectors";

export const config = createConfig({
  chains: [polygonZkEvmCardona],
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  connectors: [injected()],
  transports: {
    [polygonZkEvmCardona.id]: http(),
  },
});
