import * as React from "react";
import { Connector, useConnect } from "wagmi";

export function WalletOptions() {
  const { connectors, connect } = useConnect();

  return (
    <div className="flex gap-y-2 w-full bg-white rounded-lg shadow-lg p-4 flex-col justify-center items-center">
      <h3 className="font-light mb-2">Selecione uma forma de Login</h3>
      {connectors.map((connector) => (
        <WalletOption
          key={connector.uid}
          connector={connector}
          onClick={() => connect({ connector: connector })}
        />
      ))}
    </div>
  );
}

function WalletOption({
  connector,
  onClick,
}: {
  connector: Connector;
  onClick: () => void;
}) {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const provider = await connector.getProvider();
      setReady(!!provider);
    })();
  }, [connector]);

  return (
    <button
      className="px-3 py-2 hover:bg-gray-300 transition-colors bg-gray-200 w-full rounded-md"
      disabled={!ready}
      onClick={onClick}
    >
      {connector.name}
    </button>
  );
}
