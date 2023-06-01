import { remoteCall } from "./axios";
export const getUnspentUtxo = async () => {
  try {
    const response = await remoteCall("listunspent");
    return response.result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const selectUtxos = async (amount: number) => {
  const utxos = await getUnspentUtxo();
  const selectedUtxos: { txid: string; vout: number }[] = [];
  let currentAmount = 0;
  for (let i = 0; i < utxos.length; i++) {
    let utxo = utxos[i];
    let input = { txid: utxo.txid, vout: utxo.vout };
    currentAmount = currentAmount + utxo.amount * 100000000;
    selectedUtxos.push(input);
    if (currentAmount > amount * 100000000) {
      break;
    }
  }
  return selectedUtxos;
};

// bcrt1qce7a5pn0j7cys6l2ks8lg29pl3pwmkrlhkz94l
