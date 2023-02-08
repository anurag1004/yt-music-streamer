// on document load
// get current tab url

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    const activeUrl = activeTab.url;
    // check active url is a youtube playlist
    if (activeUrl.includes("youtube.com/playlist?list=")) {
        document.getElementById("msg").innerHTML = "This is a youtube playlist";
        // show the button
        document.getElementById("loadPlaylistBtn").style.display = "block";
    }else{
        document.getElementById("msg").innerHTML = "This is not a youtube playlist";
        // hide the button
        document.getElementById("loadPlaylistBtn").style.display = "none";
    }
});
// add event listner to button
document.getElementById("loadPlaylistBtn").addEventListener("click", function(){
    // get current tab url
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var activeTab = tabs[0];
        const activeUrl = activeTab.url;
        // redirect to localhost:4200/home?playlistUrl
        chrome.tabs.update(activeTab.id, {url: "http://localhost:4200/home?playlistUrl=" + activeUrl});
    });
})
