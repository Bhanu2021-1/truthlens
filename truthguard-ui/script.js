document.addEventListener("DOMContentLoaded", function(){

// ================= BASIC =================
const track   = document.getElementById('track');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsEl  = document.getElementById('dots');
const toast   = document.getElementById('toast');

const TOTAL = 6;
let current = 0;


// ================= CAROUSEL =================
for (let i = 0; i < TOTAL; i++) {
  const d = document.createElement('div');
  d.className = 'dot' + (i === 0 ? ' active' : '');
  d.onclick = () => goTo(i);
  dotsEl.appendChild(d);
}

function goTo(idx) {
  current = idx;
  track.style.transform = `translateX(-${current * 100}%)`;
  prevBtn.disabled = current === 0;
  nextBtn.disabled = current === TOTAL - 1;

  document.querySelectorAll('.dot').forEach((d, i) => {
    d.classList.toggle('active', i === current);
  });
}

window.move = function(dir){
  goTo(Math.max(0, Math.min(TOTAL - 1, current + dir)));
}


// ================= FILE PICKER =================
window.triggerFile = function(id){
  document.getElementById(id).click();
}

window.fileChosen = function(input,type){
  if (!input.files.length) return;

  const file = input.files[0];
  const size = (file.size / 1024 / 1024).toFixed(2);

  showToast(`✓ ${file.name} selected (${size} MB)`);

  if(type==="image") analyzeImage();
  if(type==="audio") analyzeAudio();
  if(type==="video") analyzeVideo();
}


// ================= TEXT =================
window.analyzeText = async function(){

  let text = document.getElementById("textInput").value;

  if(text.trim()===""){
    showToast("⚠ Paste text first");
    return;
  }

  showToast("🔍 Analyzing text...");

  try{
    let res = await fetch("http://127.0.0.1:8000/detect-ai-text",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({text:text})
    });

    let data = await res.json();

    document.getElementById("textResult").innerHTML =
      data.prediction+" ("+data.confidence+"%)";

    showToast("✅ Done");

  }catch{
    showToast("❌ Server error");
  }
}


// ================= URL =================
window.analyzeURL = async function(){

  let url = document.getElementById("urlInput").value;

  if(url.trim()===""){
    showToast("⚠ Paste URL first");
    return;
  }

  showToast("🌐 Scanning article...");

  try{
    let res = await fetch("http://127.0.0.1:8000/scan-url",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({url:url})
    });

    let data = await res.json();

    document.getElementById("urlResult").innerHTML =
      data.prediction+" ("+data.confidence+"%)";

    showToast("✅ Done");

  }catch{
    showToast("❌ Server error");
  }
}


// ================= NEWS =================
window.analyzeNews = async function(){

  let text = document.getElementById("newsInput").value;

  if(text.trim()===""){
    showToast("⚠ Paste news first");
    return;
  }

  showToast("📰 Checking news...");

  try{
    let res = await fetch("http://127.0.0.1:8000/detect-news",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({text:text})
    });

    let data = await res.json();

    document.getElementById("newsResult").innerHTML =
      data.prediction+" ("+data.confidence+"%)";

    showToast("✅ Done");

  }catch{
    showToast("❌ Server error");
  }
}


// ================= IMAGE =================
async function analyzeImage(){

  let file = document.getElementById("imageInput").files[0];

  if(!file){
    showToast("⚠ Select image");
    return;
  }

  showToast("🖼 Detecting deepfake...");

  let formData = new FormData();
  formData.append("file",file);

  try{
    let res = await fetch("http://127.0.0.1:8000/detect-image",{
      method:"POST",
      body:formData
    });

    let data = await res.json();

    document.getElementById("imageResult").innerHTML =
      data.prediction+" ("+data.confidence+"%)";

    showToast("✅ Done");

  }catch{
    showToast("❌ Server error");
  }
}


// ================= AUDIO =================
async function analyzeAudio(){

  let file = document.getElementById("audioInput").files[0];

  if(!file){
    showToast("⚠ Select audio");
    return;
  }

  showToast("🎤 Detecting voice clone...");

  let formData = new FormData();
  formData.append("file",file);

  try{
    let res = await fetch("http://127.0.0.1:8000/detect-voice",{
      method:"POST",
      body:formData
    });

    let data = await res.json();

    document.getElementById("audioResult").innerHTML =
      data.prediction+" ("+data.confidence+"%)";

    showToast("✅ Done");

  }catch{
    showToast("❌ Server error");
  }
}


// ================= VIDEO =================
function analyzeVideo(){
  document.getElementById("videoResult").innerHTML =
    "⚠ Video model not added yet";
  showToast("⚠ Video model coming soon");
}


// ================= TOAST =================
let toastTimer;

function showToast(msg){
  toast.textContent = msg;
  toast.classList.add("show");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>{
    toast.classList.remove("show");
  },3000);
}

});