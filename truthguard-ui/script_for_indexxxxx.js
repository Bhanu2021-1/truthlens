function goToDashboard(){
document.body.classList.add("fade-out");
setTimeout(function(){
window.location.href = "newindex.html";
},600);
}


// NEWS TEXT DETECTION
async function uploadText(){

let text = document.getElementById("textInput").value;

if(text.trim()==""){
document.getElementById("textResult").innerHTML = "⚠ Paste news text first";
return;
}

let res = await fetch("http://127.0.0.1:8000/detect-news",{
method:"POST",
headers:{ "Content-Type":"application/json"},
body: JSON.stringify({text:text})
})

let data = await res.json();

document.getElementById("textResult").innerHTML =
data.prediction + " (" + data.confidence + "% confident)";
}


// URL SCANNER
async function uploadArticle(){

let url = document.getElementById("newsInput").value;

if(url.trim()==""){
document.getElementById("urlResult").innerHTML = "⚠ Paste URL first";
return;
}

let res = await fetch("http://127.0.0.1:8000/scan-url",{
method:"POST",
headers:{ "Content-Type":"application/json"},
body: JSON.stringify({url:url})
})

let data = await res.json();

document.getElementById("urlResult").innerHTML =
data.prediction + " (" + data.confidence + "% confident)";
}


// AI TEXT DETECTOR
async function uploadAITest(){

let text = document.getElementById("aiInput").value;

if(text.trim()==""){
document.getElementById("aiResult").innerHTML = "⚠ Paste text first";
return;
}

let res = await fetch("http://127.0.0.1:8000/detect-ai-text",{
method:"POST",
headers:{ "Content-Type":"application/json"},
body: JSON.stringify({text:text})
})

let data = await res.json();

document.getElementById("aiResult").innerHTML =
data.prediction + " (" + data.confidence + "% confident)";
}


// DEMO MODULES
function uploadVideo(){
document.getElementById("videoResult").innerHTML =
"⚠ Video detection coming soon";
}

function uploadAudio(){
document.getElementById("audioResult").innerHTML =
"⚠ Audio detection coming soon";
}

function uploadImage(){
document.getElementById("imageResult").innerHTML =
"⚠ Image detection coming soon";
}