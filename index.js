// .-------------------------------------------------------------banner----------------------------------
window.addEventListener("load", function () {

  setTimeout(function () {
    document.getElementById("floatingPopup").style.display = "block";
  }, 2000);

  document.getElementById("floatingClose").onclick = function () {
    document.getElementById("floatingPopup").style.display = "none";
  };

});

// -------------------------------------------------------------hamburger icon-----------------------------------
const hamburger = document.getElementById("hamburger");
const closeIcon = document.getElementById("closeIcon");
const navLinks = document.getElementById("navLinks");
const links = navLinks.querySelectorAll("a");

hamburger.addEventListener("click", () => {
  navLinks.classList.add("show");
  hamburger.style.display = "none";
  closeIcon.style.display = "block";
});

closeIcon.addEventListener("click", closeMenu);

// Close menu when clicking any link
links.forEach(link => {
  link.addEventListener("click", closeMenu);
});

function closeMenu() {
  navLinks.classList.remove("show");
  closeIcon.style.display = "none";
  hamburger.style.display = "block";
}
// -------------------------------------------------------------homepageslider------------------------------
const slides = document.querySelectorAll(".slide");
let index = 0;

function showSlide() {
  slides.forEach(slide => slide.classList.remove("active"));
  slides[index].classList.add("active");
  index = (index + 1) % slides.length;
}

setInterval(showSlide, 1500);
// ------------------------------------------------------------Enquiry form---------------------------------
document.getElementById('whatsappForm').addEventListener('submit', function (e) {
  e.preventDefault();


  const name = encodeURIComponent(document.getElementById('name').value);
  const email = encodeURIComponent(document.getElementById('email').value);
  const phone = encodeURIComponent(document.getElementById('phone').value);
  const admissionClass = encodeURIComponent(document.getElementById('class').value);
  const message = encodeURIComponent(document.getElementById('message').value);


  const whatsappNumber = "919242119456"; // 

  const whatsappMessage = `*Admission Enquiry*%0A%0AName: ${name}%0AEmail: ${email}%0APhone: ${phone}%0AClass: ${admissionClass}%0AMessage: ${message}`;

  // Redirect to WhatsApp
  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
  window.open(whatsappURL, '_blank');
});

// ------------------------------------------------------------------------chatbot------------------------------------------
const chatbot = document.getElementById("chatbot");
const toggleBtn = document.getElementById("chatbot-toggle");
const closeBtn = document.getElementById("chatbot-close");
const chatBody = document.getElementById("chat-body");
const chatOptions = document.getElementById("chat-options");

let historyStack = [];

/* ---------- UI HELPERS ---------- */
toggleBtn.onclick = () => {
  chatbot.style.display = "flex";
  resetBot();
};

closeBtn.onclick = () => {
  chatbot.style.display = "none";
};

function botMsg(text) {
  chatBody.innerHTML += `<div class="bot-msg">${text}</div>`;
  chatBody.scrollTop = chatBody.scrollHeight;
}

function userMsg(text) {
  chatBody.innerHTML += `<div class="user-msg">${text}</div>`;
  chatBody.scrollTop = chatBody.scrollHeight;
}

function setOptions(options, showBack = true) {
  chatOptions.innerHTML = "";

  if (showBack && historyStack.length > 0) {
    const backBtn = document.createElement("button");
    backBtn.innerText = "⬅ Back";
    backBtn.onclick = goBack;
    chatOptions.appendChild(backBtn);
  }

  options.forEach(opt => {
    const btn = document.createElement("button");
    btn.innerText = opt.text;
    btn.onclick = opt.action;
    chatOptions.appendChild(btn);
  });
}

/* ---------- NAVIGATION ---------- */
function saveState(fn) {
  historyStack.push(fn);
}

function goBack() {
  if (historyStack.length > 0) {
    const last = historyStack.pop();
    last();
  }
}

/* ---------- BOT FLOWS ---------- */
function resetBot() {
  chatBody.innerHTML = "";
  historyStack = [];
  startBot();
}

function startBot() {
  botMsg("👋 How can I help you with admissions?");
  setOptions([
    { text: "🏫 School Admission", action: () => { saveState(startBot); schoolAdmission(); } },
    { text: "📘 PU College Admission", action: () => { saveState(startBot); puAdmission(); } },
    { text: "🎓 Degree College Admission", action: () => { saveState(startBot); degreeAdmission(); } }
  ], false);
}

/* ---------- SCHOOL ---------- */
function schoolAdmission() {
  userMsg("School Admission");
  botMsg("Please select the standard:");

  setOptions([
    { text: "1st – 5th Standard", action: () => { saveState(schoolAdmission); admissionDetails("1st – 5th"); } },
    { text: "6th – 10th Standard", action: () => { saveState(schoolAdmission); admissionDetails("6th – 10th"); } }
  ]);
}

function admissionDetails(standard) {
  userMsg(standard);
  botMsg(`Admission details for ${standard}:`);

  setOptions([
    { text: "📅 Admission Date", action: () => showInfo(schoolAdmission, "Admissions open from 15th March to 30th April") },
    { text: "💰 Admission Fee", action: () => showInfo(schoolAdmission, "Fees range between ₹25,000 – ₹40,000 per year") },
    { text: "🎂 Age Criteria", action: () => showInfo(schoolAdmission, "Minimum age 5+ years as on 1st June") },
    { text: "📄 Required Documents", action: () => showInfo(schoolAdmission, "Birth Certificate, Aadhar Card, Previous Report Card, 2 Photos") },
    { text: "⏰ School Timing", action: () => showInfo(schoolAdmission, "School timing: 8:45 AM – 3:30 PM") },
    { text: "🚌 Transport Facility", action: () => showInfo(schoolAdmission, "Transport available with additional charges") },
    { text: "☎ Contact Admission Office", action: () => { saveState(admissionDetails.bind(null, standard)); contactInfo(); } }
  ]);
}

/* ---------- PU COLLEGE ---------- */
function puAdmission() {
  userMsg("Jamia PU College Admission");
  botMsg("Please select an option:");

  setOptions([
    { text: "📚 Streams Offered", action: () => showInfo(puAdmission, "Science, Commerce & Arts streams available") },
    { text: "✅ Eligibility", action: () => showInfo(puAdmission, "Pass in SSLC / 10th from recognized board") },
    { text: "💰 Fee Structure", action: () => showInfo(puAdmission, "Fees range between ₹45,000 – ₹85,000 per year") },
    { text: "📄 Required Documents", action: () => showInfo(puAdmission, "SSLC Marks Card, TC, Aadhar Card") },
    { text: "⏰ College Timing", action: () => showInfo(puAdmission, "College timing: 9:00 AM – 4:00 PM") },
    { text: "☎ Contact Admission Office", action: () => { saveState(puAdmission); contactInfo(); } }
  ]);
}

/* ---------- DEGREE COLLEGE ---------- */
function degreeAdmission() {
  userMsg(" Asian International University,Manipur.Degree College Admission");
  botMsg("Please choose an option:");

  setOptions([
    { text: "🎓 Courses Available", action: () => showInfo(degreeAdmission, "UG,PG,ENGINEERING,LAW,PHARMACY,NURSING,PARAMEDICAL COURSES") },
    { text: "✅ Eligibility", action: () => showInfo(degreeAdmission, "PU / 12th pass from recognized board") },
    { text: "💰 Fee Structure", action: () => showInfo(degreeAdmission, "Fees start from ₹60,000 per year") },
    { text: "💼 Internship & Placement", action: () => showInfo(degreeAdmission, "Internships and placement assistance available") },
    { text: "📄 Required Documents", action: () => showInfo(degreeAdmission, "PU Marks Card, TC, Migration Certificate, Aadhar") },
    { text: "☎ Contact Admission Office", action: () => { saveState(degreeAdmission); contactInfo(); } }
  ]);
}

/* ---------- COMMON INFO VIEW ---------- */
function showInfo(backFn, text) {
  saveState(backFn);
  botMsg(text);
  setOptions([
    { text: "☎ Contact Admission Office", action: contactInfo }
  ]);
}

/* ---------- CONTACT ---------- */
function contactInfo() {
  botMsg("📞 Admission Office Contact:");
  botMsg("<b>+91 98765 43210</b><br>🕘 9:00 AM – 5:00 PM (Mon–Sat)");

  setOptions([]);
}



// -------------------------------------------------enroll forms of jamia pu and asian degree--------------------


const WHATSAPP_NUMBER = "919242119456"; 

function openForm(formId) {
  document.getElementById("overlayform").style.display = "block";
  document.getElementById(formId).style.display = "block";
}

function closeAllForms() {
  document.getElementById("overlayform").style.display = "none";
  document.querySelectorAll(".popup-form").forEach(f => f.style.display = "none");
}

/* JAMIA FORM WHATSAPP */
function sendJamiaWhatsApp(e) {
  e.preventDefault();

  const name = document.getElementById("jamiaName").value;
  const course = document.getElementById("jamiaClass").value;
  const phone = document.getElementById("jamiaPhone").value;

  const msg = `Jamia PU College Enquiry:
Name: ${name}
Applying For: ${course}
Mobile: ${phone}`;

  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
}

/* AIU FORM WHATSAPP */
function sendAIUWhatsApp(e) {
  e.preventDefault();

  const name = document.getElementById("aiuName").value;
  const course = document.getElementById("aiuCourse").value;
  const phone = document.getElementById("aiuPhone").value;

  const msg = `Asian International University Enquiry:
Name: ${name}
Course: ${course}
Mobile: ${phone}`;

  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
}

