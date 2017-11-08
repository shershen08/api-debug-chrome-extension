// Enable chromereload by uncommenting this line:
// import 'chromereload/devonly';
var currentTabId;
var version = "1.0";

chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});

chrome.webRequest.onCompleted.addListener((details) => {
  console.log('webRequest', details)

  chrome.tabs.query( //get current Tab
    {
        currentWindow: true,
        active: true
    },
    function(tabArray) {
      console.log(tabArray, details.tabId)
        currentTabId = (tabArray && tabArray[0] && tabArray[0].id) || details.tabId;
        chrome.debugger.attach({ //debug at current tab
            tabId: currentTabId
        }, version, onAttach.bind(null, currentTabId));
    }
)



}, {urls: ['https://*/*'],
 types: ['xmlhttprequest']})

/*
 function listener(details) {
  let filter = chrome.webRequest.filterResponseData(details.requestId);
  let decoder = new TextDecoder("utf-8");
  let encoder = new TextEncoder();

  filter.ondata = event => {
    let str = decoder.decode(event.data, {stream: true});
    // Just change any instance of Example in the HTTP response
    // to WebExtension Example.
console.log('xmlhttprequest', str);
    //str = str.replace(/Example/g, 'WebExtension Example');
    //filter.write(encoder.encode(str));
    filter.write(str);
    filter.disconnect();
  }

  filter.finish = event => {
    console.log('finish');
  }

  filter.end = event => {
    console.log('finish');
  }

  return {};
}
*/
// chrome.webRequest.onBeforeRequest.addListener(
//   listener,
//   {urls: ['https://*/*'],
//   types: ['xmlhttprequest']},
//   ["blocking"]
// );


// chrome.tabs.query( //get current Tab
//     {
//         currentWindow: true,
//         active: true
//     },
//     function(tabArray) {
//         currentTab = tabArray[0];
//         chrome.debugger.attach({ //debug at current tab
//             tabId: currentTab.id
//         }, version, onAttach.bind(null, currentTab.id));
//     }
// )


function onAttach(tabId) {
  
      chrome.debugger.sendCommand({ //first enable the Network
          tabId: tabId
      }, "Network.enable");
  
      chrome.debugger.onEvent.addListener(allEventHandler);
  
  }
  
  
  function allEventHandler(debuggeeId, message, params) {
  
      if (currentTabId != debuggeeId.tabId) {
          return;
      }
  
      if (message == "Network.responseReceived") { //response return 
          chrome.debugger.sendCommand({
              tabId: debuggeeId.tabId
          }, "Network.getResponseBody", {
              "requestId": params.requestId
          }, function(response) {
              console.log(response)
              // you get the response body here!
              // you can close the debugger tips by:
              //chrome.debugger.detach(debuggeeId);
          });
      }
  
  }
 
chrome.browserAction.setBadgeText({text: ''});
