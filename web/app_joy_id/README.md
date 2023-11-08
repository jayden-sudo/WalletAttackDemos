- Website
  - [app.joy.id](https://app.joy.id/)

- Risk
  - Unsecured use of passkey -- The public key of passkey may be used as the wallet private key

- Status
  
  - Wait for joy.id confirm, and want to understand the purpose of using this design.
  
- Comment
  - joy.id uses passkey to sign the transaction, but the transaction is not actually signed through passkey. During the transaction signing process, joy.id recover passkey-p256 public key, and use the pubKey by signing it, and derives the user's private key by performing similar calculations:

    ```c
    PrivateKey = Hmac-sha512( sha256(pubKey || sha256(pubKey)), "Bitcoin seed")
    ```


    Because passkey's public key is not confidential as compared to the private key, there is a large possibility of leakage, and if the user's public key is leaked, all wallet assets created by the user in joy.id may be lost.

- Detail Step

  - Login:

    - Sign a random number

    - Xhr to https://api.joy.id/api/v1/credentials/$(credentialId)
      ![1](imgs/1.png)

    - Sign a random number again
      ![2](imgs/2.png)

    - Call function `recoverSkMainWithCommitment`
      ![3](imgs/3.png)

    - The public key `jr` recovered by `recoverP256Pubkey`

    - Call function `calcCommitmentWithPk`

      ![4](imgs/4.png)

    - Call function `calcSKMain`

      - `Mr = sha256(kr || sha256(kr)) ;` // kr = jr =  the public key of passkey

    - Call function `calcCommitmentWithSk`

      - `return sha256(Mr.slice(0,4)).slice(0,8);`

    - Compare the results of dhCommitment (from xhr result) and calcCommitmentWithSk() to check whether the recovered public key is correct.

      If correct then `calcSkMain(jr)` //   jr = the public key of passkey
      ![5](imgs/5.png)

    - The result:

     ```c
        Hex(sha256(jr|| sha256(jr))) = 0a6b234c38402100d2c0ff0af6de921c730fb0439d96fa5df346c03558af2a39
     ```
     ![6](imgs/6.png)

    - Derive private key
          ![7](imgs/7.png)
      
    - In the `generateEthAddress` function, `generateEthAccount` -&gt; `hdKeyToAccount(HDKey.fromMasterSeed(kr))`, kr = On
     ![8](imgs/8.png)
      ![9](imgs/9.png)

     
    
    - The fixed MASTER_SECRET data used, and the hash value `Mr` That relies on the passkey public key, and generates privateKey: jr via `Hmac-sha512`
    - Then call `hdKeyToAccount`  to derive private

     ![10](imgs/10.png)
     ![11](imgs/11.png)
     ![12](imgs/12.png)



-- -
   ![a0](imgs/a0.png)

Source file:https://app.joy.id/assets/index-80f5b282.js or [index-80f5b282.js.zip](source/index-80f5b282.js.zip)

