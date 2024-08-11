interface Action {
  action: string;
  address: string;
  amount: number;
  block_number: number;
  id: string;
  timestamp_: number;
  transactionHash_: string;
  contractId_: string;
}

interface Character {
  dob: bigint;
  dod: bigint;
  payRate: bigint;
  payLast: bigint;
  nap: bigint;
  napRate: bigint;
  napLast: bigint;
  eat: bigint;
  eatRate: bigint;
  eatLast: bigint;
  run: bigint;
  runRate: bigint;
  runLast: bigint;
}
