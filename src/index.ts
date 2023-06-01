import { selectUtxos } from "./utils/utxo";
import { remoteCall } from "./utils/axios";

const createPSBTTransaction = async () => {
  try {
    const utxos = await selectUtxos(350);
    const body = [
      [...utxos],
      [
        { bcrt1qce7a5pn0j7cys6l2ks8lg29pl3pwmkrlhkz94l: 250 },
        { bcrt1qggkud9j969ll8ntxdvmfnmyct572zv8nl5dtcf: 100 },
      ],
    ];
    const transaction = await remoteCall("walletcreatefundedpsbt", body);
    return transaction.result.psbt;
  } catch (error) {
    throw error;
  }
};

const signPsbtTransaction = async () => {
  const psbt = await createPSBTTransaction();
  try {
    const response = await remoteCall("walletprocesspsbt", [psbt]);
    // return response.data.result.psbt;
    return response.result.psbt;
  } catch (error) {
    throw error;
  }
};

const finalizePsbt = async () => {
  const body = await signPsbtTransaction();
  try {
    const response = await remoteCall("finalizepsbt", [body]);
    return response.result.hex;
  } catch (error) {
    throw error;
  }
};

const sendRawTransaction = async () => {
  const hex = await finalizePsbt();
  try {
    const response = await remoteCall("sendrawtransaction", [hex]);
    // return response.data.result;
    console.log(response);
  } catch (error) {
    throw error;
  }
};

sendRawTransaction();
