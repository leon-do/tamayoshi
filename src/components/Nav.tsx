import { ConnectButton, lightTheme } from "thirdweb/react";
import { client, chain } from "../app/client";

export default function Nav() {
  return (
    <div className="flex justify-center m-2">
      <ConnectButton
        client={client}
        connectButton={{
          label: "Login",
        }}
        theme={lightTheme({
          colors: {
            primaryButtonBg: "white",
            primaryButtonText: "black",
          },
        })}
        // https://playground.thirdweb.com/connect/account-abstraction
        accountAbstraction={{
          chain,
          sponsorGas: true,
        }}
      />
    </div>
  );
}
