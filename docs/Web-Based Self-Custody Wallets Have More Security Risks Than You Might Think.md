# Web-Based Self-Custody Wallets Have More Security Risks Than You Might Think (Some Are Unsolvable in the Short Term)

I've spent some time with web self-custody wallets recently and initially wrote an article about passkeys: 
[A Path to “Easy and Secure” Account](https://hackmd.io/@Jayden-sudo/SkprILiRn), which argues that using passkey-based wallets through ZKP (Zero-Knowledge Proofs) is a safer option for most users.

Thanks to [webauthn](https://www.w3.org/TR/webauthn-2/), it's even possible to use self-custody wallets in the browser more simply and securely:

1. Simplicity
   - No need to download any apps or browser extensions, just access the wallet website using mainstream browsers (Chrome, Safari, Edge, etc.).
2. Security
   - The private key is hosted within the system, especially on devices with hardware security chip support from [Apple](https://support.apple.com/en-sg/102195), [Google](https://developers.google.com/identity/passkeys), [Microsoft](https://learn.microsoft.com/en-us/windows/security/identity-protection/passkeys/?tabs=windows).
   - Neither hackers nor users themselves can export the private key, preventing losses due to leaks (to avoid potential attacks, refer to 'A Path to “Easy and Secure” Account').

```
To avoid unnecessary debate, I define the most minimalist version of a web self-custody wallet as follows:
1. A wallet that can fully operate in any modern browser compatible with the webauthn standard.
   - This means it does not rely on browser extensions or a specific browser.
2. The wallet doesn’t depend on any external features beyond the web wallet and browser’s own functionality when signing transactions.
   - This implies that the user's private key can only be saved within the web wallet or using the browser's common API, and signing does not depend on external hardware wallets or other wallets.
```

However, the deeper I delved, the more I realized that achieving 'security' might not be easy, and many risks are insurmountable.

Here are the potential security risks during the implementation of a web wallet:

```
To avoid being too lengthy, I intentionally did not mention security issues that other forms of wallets also face, such as supply chain attacks.
```

1. Reviewability of Release/Binary Files

   - Scenario/Issue
     - 'Reviewability' is crucial for open-source wallets, allowing users to compile the source code themselves and compare it with the version on their local computer to ensure it hasn’t been tampered with. However, binary comparisons are relatively more complex for web wallets.
   
   - Solution
     - Web wallets could be hosted on platforms like IPFS, or even downloaded offline to your machine and loaded through a browser. However, these solutions would reduce the convenience of a web wallet.
   
2. Risk of Key API Hijacking, such as webauthn

   - Scenario/Issue
     - Even if we disregard browser security flaws and operating system vulnerabilities, when signing transactions using webauthn in a web wallet, there is a risk that the transaction signing function could be hijacked. Users may not be able to confirm if they are signing the intended transaction, as malicious software could replace a transaction at the moment of signing (e.g., changing a 10 USDC transfer into transferring all assets to a hacker’s wallet). Since current webauthn implementations do not show the plaintext to be signed before the actual signing, this increases the risk.
   
   - Solution
     - None! -_- !  Without considering the risks of browser and OS vulnerabilities, our resistance is limited.
       - Browser extensions can load before a webpage, creating a virtual environment before any JavaScript code runs, making all detection measures ineffective.
       - Attempting to detect hijacking using `window.navigator.credentials.get.toString().indexOf("[native code]") > 0` will not work, as the `toString` or `indexOf` functions themselves could be hijacked.
       - Even using `Object.freeze()` to prevent hijacking is futile (as the hijacking by a malicious extension would have been completed before `Object.freeze()` is executed).
       - Trying to create a secure environment through new iframes or Web Workers could also be ineffective, as the iframe environment and communication with Web Workers can also be hijacked.
       - Additionally, in the security arms race, wallets are often at a disadvantage since self-custody wallets must be fully open source, meaning all their defensive measures are public and can be specifically targeted by malware.

3. Conventional Attacks, like DNS Attacks

   - For example, organizations like the Web Security Working Group have been pushing for security enhancements, such as SOP, CSP, HSTS, etc. (Source: [w3c](https://www.w3.org/groups/wg/webappsec/publications/) ) 
   - Yet, these conventional security measures can't entirely prevent attacks.





Given the risks associated with self-custody web wallets, beyond suggesting that developers at least familiarize themselves with materials such as those available at  [w3c](https://www.w3.org/groups/wg/webappsec/publications/)

1. Should we be more cautious regarding the use of web wallets? 
2. Is it essential to steer users towards non-web alternatives such as extensions or mobile apps?

I would like to hear your opinions!


Update:
 - CSP (Content Security Policy) prevents content loaded, but the browser extensions can modify the CSP policy: https://www.namogoo.com/privacy-security/how-browser-extensions-routinely-bypass-a-content-security-policy/
 - It seems that Chrome will allow you to *quickly block all extensions at the same time on specific websites. – [link](https://www.reddit.com/r/chrome/comments/1060t64/it_seems_that_chrome_will_allow_you_to_quickly/?utm_source=share&utm_medium=web2x&context=3)
 - A stand-alone web wallet currently relies heavily on webauthn, which may be designed on different principles than a key that is used as a direct asset manager. if there is a risk to the signing algorithm, other wallets can simply add a new signature algorithm, but web-based wallet is hard to fix that problem.





--- 

[tweet](https://x.com/jayden_sudo/status/1720010934092190079?s=20)