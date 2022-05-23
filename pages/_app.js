import '../styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css';


import {
  apiProvider,
  configureChains,
  getDefaultWallets,
  connectorsForWallets, 
  RainbowKitProvider,
  wallet 
} from '@rainbow-me/rainbowkit';
import { chain, createClient, WagmiProvider } from 'wagmi';

const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
  [
    apiProvider.alchemy(process.env.ALCHEMY_ID),
    apiProvider.fallback()
  ]
);
// const { connectors } = getDefaultWallets({
//   appName: 'Eyad Dev App',
//   chains
// });
const connectors = connectorsForWallets([
  {
    groupName: 'Popular',
    wallets: [
      wallet.coinbase({ chains }),
      wallet.metaMask({chains}),
      wallet.walletConnect({ chains }),
      wallet.ledger({chains}),
      wallet.trust({chains}),
      wallet.imToken({chains}),
      wallet.injected({chains}),
      wallet.argent({chains})
    ],
  },
]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,

})




function MyApp({ Component, pageProps }) {

    return (
      <WagmiProvider client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </WagmiProvider>
      
    );

}

export default MyApp
