# sdk-js

Javascript SDK to access Bauction on the internet computer

**Installation:**

```
yarn add @bauction/sdk-js
```

or

```
npm install @bauction/sdk-js
```

**Basic Usage:**

```js
import Bauction from "@bauction/sdk-js";
const bauctionInstance = new Bauction();
//use async function for this:
await bauctionInstance.initIdentity("secret_key");

bauctionInstance.getAllAuctions(); //to fetch all auctions from bauction canister.
```

## Example:

```js
import Bauction from "@bauction/sdk-js";
const bauctionIns = new Bauction();

const initializeBauction = async () => {
  await bauctionIns.initIdentity("secret_key");
};

initializeBauction();

bauctionIns.getMyAuctions(); //returns all auctions created by identity bauction is initialized with.
```
