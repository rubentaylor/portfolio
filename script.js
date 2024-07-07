function toggleMenu(){
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open")
    icon.classList.toggle("open")
}
document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");
    const fullName = document.getElementById("name");
    const email = document.getElementById("email");
    const subject = document.getElementById("subject");
    const message = document.getElementById("message");

    function sendMail(event) {
        event.preventDefault(); 
        let parms = {
            name: fullName.value,
            email: email.value,
            subject: subject.value,
            message: message.value,
        };
        emailjs.send("service_ldft4ab", "template_nwnm6j7", parms)
            .then(function(response) {
                alert("Email Sent!"); 
                form.reset();
            }, function(error) {
                console.error("Failed to send email. Error:", error);
                alert("Failed to send email. Please try again later.");
            });
    }
    if (form) {
        form.addEventListener("submit", sendMail);
    } else {
        console.error("Form element not found.");
    }
});