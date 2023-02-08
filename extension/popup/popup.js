//document.getElementById("clickerButton").onclick = function() {
function openWindow() {
    chrome.windows.create({
    url: chrome.runtime.getURL("window.html"),
    type: "popup"
    }, function(win) {
    // win represents the Window object from windows API
    // Do something after opening
    });
}//;

document.getElementById("clickerButton").addEventListener("click", openWindow);
