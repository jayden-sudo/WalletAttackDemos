# Web-based Wallet security practices

- Background:
  - Based on  [**Web-Based Self-Custody Wallets Have More Security Risks Than You Might Think (Some Are Unsolvable in the Short Term**](docs/Web-Based%20Self-Custody%20Wallets%20Have%20More%20Security%20Risks%20Than%20You%20Might%20Think.md), I think we need to try to document known security risks and hopefully find ways to mitigate them.
  - ⚠️ Note: This document focuses on security practices specific to the Web-based Self-Custody Wallet and will not cover regular web attacks ([but this section is so important that you should not overlook it if you want to learn more](https://developer.mozilla.org/en-US/docs/Web/Security)).
  
# List

When I was gathering information on security, I found that [owasp.org](https://cheatsheetseries.owasp.org/cheatsheets/AJAX_Security_Cheat_Sheet.html) has a lot of relevant research. I recommend checking it out.



- ‼️ browser extension risk 

  - As of now, apart from advising users to disable browser extensions, there is no effective way to prevent the use of browser extensions!





- [prototype pollution](https://portswigger.net/web-security/prototype-pollution)

  - [Creating object with Object.create(null)](https://medium.com/@pratiprati/creating-object-with-object-create-null-6f6a51de3a08)
  
    - ```javascript
      var _obj = Object.create(null);
      ```
  
  - Freezes an object with [Object.freeze()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)
  
    - ```javascript
      Object.freeze(obj);
      ```
  
  - Never use eval()





- [software supply chain attacks](https://www.crowdstrike.com/cybersecurity-101/cyberattacks/supply-chain-attacks/)
  - ‼️ Building Web with [LavaMoat](https://github.com/LavaMoat/LavaMoat) 





- [DNS over TLS (DoT) or DNS over HTTPS (DoH)](https://www.cloudflare.com/learning/dns/dns-over-tls/)





- [Content Security Policy [Level 2]](https://www.w3.org/TR/CSP2/) [[Level 3](https://www.w3.org/TR/CSP3/)]
  
  - [default-src](https://www.w3.org/TR/CSP3/#directive-default-src)
  
    - Associated risk:
  
      - [Cross Site Scripting (XSS)](https://owasp.org/www-community/attacks/xss/)
  
    - The default-src directive serves as a fallback for the other [fetch directives](https://www.w3.org/TR/CSP3/#fetch-directives)
  
    - suggest:
  
      - ```yaml
        default-src 'self';
        ```
    
  - [connect-src](https://www.w3.org/TR/CSP3/#directive-connect-src)
  
    - Associated risk:
  
      - [Cross Site Scripting (XSS)](https://owasp.org/www-community/attacks/xss/)
  
    - suggest:
  
      - ```yaml
        connect-src 'self' https://*.someAPI.com;
        ```
    
  - [frame-src](https://www.w3.org/TR/CSP3/#directive-frame-src)
  
    - Associated risk:
  
      - [Cross Site Scripting (XSS)](https://owasp.org/www-community/attacks/xss/)
      - [UI redress attack](https://owasp.org/www-community/attacks/Clickjacking)
    
    - suggest:
    
      - ```yaml
        frame-src 'none';
        ```
    
  - [frame-ancestors](https://www.w3.org/TR/CSP3/#directive-frame-ancestors)
  
    - Associated risk:
  
      - [UI redress attack](https://owasp.org/www-community/attacks/Clickjacking)
      
    - Refer: X-Frame-Options
    
    - suggest:
    
      - ```yaml
        frame-ancestors 'none';
        X-Frame-Options: DENY
        ```
        
    
  - [img-src](https://www.w3.org/TR/CSP3/#directive-img-src)
  
    - Associated risk:
  
      - [Cross Site Scripting (XSS)](https://owasp.org/www-community/attacks/xss/)
      - [UI redress attack](https://owasp.org/www-community/attacks/Clickjacking)
    
    - suggest:
    
      - ```shell
        img-src 'https://*';
        ```
    
  - [media-src](https://www.w3.org/TR/CSP3/#directive-media-src)
  
    - Associated risk:
  
      - [Cross Site Scripting (XSS)](https://owasp.org/www-community/attacks/xss/)
  
    - suggest:
  
      - ```shell
        media-src 'https://*';
        ```
    
  - [object-src](https://www.w3.org/TR/CSP3/#directive-object-src)
  
    - Associated risk:
  
      - [Cross Site Scripting (XSS)](https://owasp.org/www-community/attacks/xss/)
  
    - suggest:
  
      - ```shell
        object-src 'self';
        ```
    
  - [script-src](https://www.w3.org/TR/CSP3/#directive-script-src)
  
    - Associated risk:
  
      - [Cross Site Scripting (XSS)](https://owasp.org/www-community/attacks/xss/)
      - [DOM Clobbering](https://domclob.xyz/domc_wiki/#overview)
    
    - suggest:
    
      - ```shell
        script-src 'self';
        ```
    
  - [worker-src](https://www.w3.org/TR/CSP3/#directive-worker-src)
  
    - Associated risk:
  
      - [Cross Site Scripting (XSS)](https://owasp.org/www-community/attacks/xss/)
  
    - suggest:
  
      - ```shell
        worker-src 'self';
        ```
    





- [Cookie - SameSite](https://portswigger.net/web-security/csrf/bypassing-samesite-restrictions#:~:text=SameSite%20is%20a%20browser%20security,leaks%2C%20and%20some%20CORS%20exploits.)

    - Associated risk:

      - [Cross-Site Request Forgery (CSRF) ](https://www.synopsys.com/glossary/what-is-csrf.html#:~:text=Definition,has%20in%20an%20authenticated%20user.)
      - [UI redress attack](https://owasp.org/www-community/attacks/Clickjacking)

    - suggest:

      - ```shell
        SameSite=Strict
        ```
        






- [Subresource Integrity (SRI)](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity)

    - Associated risk:

      - Subresource Integrity attack

    - suggest:

      - ```html
        <script integrity="sha384-xxx"...
        <link integrity="sha384-xxx"...
        ```






- postMessage origin

  - Associated risk:

    - [Cross Site Scripting (XSS)](https://owasp.org/www-community/attacks/xss/)

  - suggest:

    - ```javascript
      window.addEventListener('message', function(event) {
        if (event.origin !== 'https://yourWeb.com') {
          return;
        }
      });
      
      otherWindow.postMessage(message, 'https://yourWeb.com');
      ```





- X-Content-Type-Options

  - Associated risk:

    - [MIME Confusion Attacks](https://blog.mozilla.org/security/2016/08/26/mitigating-mime-confusion-attacks-in-firefox/)

  - suggest:
    
      - ```yaml
        X-Content-Type-Options: nosniff
        ```






- HTTP [Strict Transport Security](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security) (**HSTS**)

  - Associated risk:
    - [manipulator-in-the-middle attack (MitM)](https://developer.mozilla.org/en-US/docs/Glossary/MitM)
    
  - suggest:
    
    - ```shell
      Strict-Transport-Security: max-age=86400; includeSubDomains
      ```
    
      
