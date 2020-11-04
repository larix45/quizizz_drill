function loadUrl(details)
{
    console.log("page loaded");
    if(details["type"] == "xmlhttprequest" && details["url"].includes("gameSummaryRec?"))
    {
        console.log(details["url"].substring(details["url"].indexOf("quizId=")+7));
        //console.log(details["url"]);
        console.log(localStorage.setItem("idq", details["url"].substring(details["url"].indexOf("quizId=")+7)));
    }
    
    

}

/*function connected(port)
{
    console.log("connected to c script");
    port.onMessage.addListener(function(m) {
        console.log(m["msg"]);
    });
}*/


browser.webRequest.onHeadersReceived.addListener(loadUrl, {
    urls: ["https://quizizz.com/*"]
});


//browser.runtime.onConnect.addListener(connected);