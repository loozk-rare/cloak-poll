import { Providers as WagmiProviders } from "../providers";
import "@/styles/style.scss";
import { SharedStateProvider } from "@/utils/store";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import PlausibleProvider from "next-plausible";
import type { AppProps } from "next/app";
import { sepolia } from "wagmi/chains";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PlausibleProvider domain="example.com" trackOutboundLinks>
      <SharedStateProvider>
        <WagmiProviders>
          <RainbowKitProvider modalSize="compact">
            <Component {...pageProps} />
          </RainbowKitProvider>
        </WagmiProviders>
      </SharedStateProvider>
    </PlausibleProvider>
  );
}
