
window.addEventListener("load", function () {

    setTimeout(function () {
        document.getElementById("floatingPopup").style.display = "block";
    }, 2000);

    document.getElementById("floatingClose").onclick = function () {
        document.getElementById("floatingPopup").style.display = "none";
    };

});


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

const slides = document.querySelectorAll(".slide");
let index = 0;

function showSlide() {
    slides.forEach(slide => slide.classList.remove("active"));
    slides[index].classList.add("active");
    index = (index + 1) % slides.length;
}

setInterval(showSlide, 1500);

document.getElementById('whatsappForm').addEventListener('submit', function (e) {
    e.preventDefault(); // prevent default form submit

    // Get form values
    const name = encodeURIComponent(document.getElementById('name').value);
    const email = encodeURIComponent(document.getElementById('email').value);
    const phone = encodeURIComponent(document.getElementById('phone').value);
    const admissionClass = encodeURIComponent(document.getElementById('class').value);
    const message = encodeURIComponent(document.getElementById('message').value);

    // Your WhatsApp number with country code (no + sign)
    const whatsappNumber = "919242119456"; // Replace with your school number

    // Construct WhatsApp message
    const whatsappMessage = `*Admission Enquiry*%0A%0AName: ${name}%0AEmail: ${email}%0APhone: ${phone}%0AClass: ${admissionClass}%0AMessage: ${message}`;

    // Redirect to WhatsApp
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
    window.open(whatsappURL, '_blank');
});

