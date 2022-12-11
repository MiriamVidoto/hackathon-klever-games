import { TransactionType, web } from '@klever/sdk';
import {
  connectWithKleverWeb,
  connectWithWindow,
  connectWithSdk,
} from './connections';

const balance = async () => {
  let balance = 0;
  if (!window.kleverWeb) {
    console.log('KleverWeb is not installed');
    return balance;
  }

  try {
    balance = await window.kleverWeb.getBalance();
  } catch (e) {
    console.log(e);
  }

  return balance;
};

const address = () => {
  if (!window.kleverWeb) {
    console.log('KleverWeb is not installed');
    return '';
  }

  return window.kleverWeb.address;
};

const send = async (to, amount) => {
  if (!window.kleverWeb) {
    console.log('KleverWeb is not installed');
    return;
  }

  const tx = await web.buildTransaction([
    {
      type: TransactionType.Transfer,
      payload: {
        receiver: to,
        amount: amount,
        asset: 'KLV',
      },
    },
  ]);

  await web.signTransaction(tx);
  const res = await web.broadcastTransactions([tx]);
  return res;
};

export default {
  connectWithKleverWeb,
  connectWithSdk,
  connectWithWindow,
  send,
  address,
  balance,
};
