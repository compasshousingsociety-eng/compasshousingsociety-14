/* ==========================================
   AUTH PAGES SCRIPTS
   ========================================== */

// Toggle Password Visibility
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const icon = input.parentElement.querySelector('.toggle-password i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Utility function to trim and validate input
function trimInput(input) {
    input.value = input.value.trim();
}

// Prevent leading spaces in real-time
function preventLeadingSpaces(input) {
    input.addEventListener('input', function() {
        if (this.value.startsWith(' ')) {
            this.value = this.value.trimStart();
        }
    });
}

// Auto-trim on blur for all text/email inputs
function setupAutoTrim() {
    const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            trimInput(this);
        });
        preventLeadingSpaces(input);
    });
}

// Validate phone number - only digits
function setupPhoneValidation() {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function() {
            // Remove any non-digit characters
            this.value = this.value.replace(/\D/g, '');
        });
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    setupAutoTrim();
    setupPhoneValidation();
});

// Login Form Handler
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        
        // Trim values
        trimInput(emailInput);
        trimInput(passwordInput);
        
        const email = emailInput.value;
        const password = passwordInput.value;
        const remember = document.getElementById('remember').checked;
        
        let isValid = true;
        
        // Email validation
        const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        if (!email || !emailPattern.test(email) || email.includes(' ')) {
            emailInput.classList.add('is-invalid');
            isValid = false;
        } else {
            emailInput.classList.remove('is-invalid');
            emailInput.classList.add('is-valid');
        }
        
        // Password validation
        if (!password || password.length < 6) {
            passwordInput.classList.add('is-invalid');
            isValid = false;
        } else {
            passwordInput.classList.remove('is-invalid');
            passwordInput.classList.add('is-valid');
        }
        
        if (isValid) {
            console.log('Login:', { email, password, remember });
            alert('Login successful! Redirecting...');
            
            setTimeout(function() {
                window.location.href = 'index.html';
            }, 1000);
        }
    });
}

// Register Form Handler
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const firstNameInput = document.getElementById('firstName');
        const lastNameInput = document.getElementById('lastName');
        const emailInput = document.getElementById('regEmail');
        const phoneInput = document.getElementById('phone');
        const passwordInput = document.getElementById('regPassword');
        const confirmPasswordInput = document.getElementById('confirmPassword');
        const termsInput = document.getElementById('terms');
        
        // Trim all inputs
        [firstNameInput, lastNameInput, emailInput, phoneInput, passwordInput, confirmPasswordInput].forEach(input => {
            if (input) trimInput(input);
        });
        
        const firstName = firstNameInput.value;
        const lastName = lastNameInput.value;
        const email = emailInput.value;
        const phone = phoneInput.value;
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        const terms = termsInput.checked;
        
        let isValid = true;
        
        // Name validation pattern
        const namePattern = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
        
        // First Name validation
        if (!firstName || !namePattern.test(firstName)) {
            firstNameInput.classList.add('is-invalid');
            isValid = false;
        } else {
            firstNameInput.classList.remove('is-invalid');
            firstNameInput.classList.add('is-valid');
        }
        
        // Last Name validation
        if (!lastName || !namePattern.test(lastName)) {
            lastNameInput.classList.add('is-invalid');
            isValid = false;
        } else {
            lastNameInput.classList.remove('is-invalid');
            lastNameInput.classList.add('is-valid');
        }
        
        // Email validation
        const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        if (!email || !emailPattern.test(email) || email.includes(' ')) {
            emailInput.classList.add('is-invalid');
            isValid = false;
        } else {
            emailInput.classList.remove('is-invalid');
            emailInput.classList.add('is-valid');
        }
        
        // Phone validation
        const phonePattern = /^[0-9]{10}$/;
        if (!phone || !phonePattern.test(phone)) {
            phoneInput.classList.add('is-invalid');
            isValid = false;
        } else {
            phoneInput.classList.remove('is-invalid');
            phoneInput.classList.add('is-valid');
        }
        
        // Password validation
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!password || !passwordPattern.test(password)) {
            passwordInput.classList.add('is-invalid');
            isValid = false;
        } else {
            passwordInput.classList.remove('is-invalid');
            passwordInput.classList.add('is-valid');
        }
        
        // Confirm Password validation
        if (password !== confirmPassword) {
            confirmPasswordInput.classList.add('is-invalid');
            isValid = false;
        } else {
            confirmPasswordInput.classList.remove('is-invalid');
            confirmPasswordInput.classList.add('is-valid');
        }
        
        // Terms validation
        if (!terms) {
            termsInput.classList.add('is-invalid');
            alert('Please accept the terms and conditions');
            isValid = false;
        } else {
            termsInput.classList.remove('is-invalid');
        }
        
        if (isValid) {
            console.log('Register:', { firstName, lastName, email, phone, password });
            alert('Registration successful! Please check your email to verify your account.');
            
            setTimeout(function() {
                window.location.href = 'login.html';
            }, 1000);
        }
    });
    
    // Password Strength Checker
    const passwordInput = document.getElementById('regPassword');
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            const strengthFill = document.querySelector('.strength-fill');
            const strengthText = document.querySelector('.strength-text');
            
            if (!strengthFill || !strengthText) return;
            
            let strength = 0;
            
            if (password.length >= 8) strength++;
            if (password.match(/[a-z]/)) strength++;
            if (password.match(/[A-Z]/)) strength++;
            if (password.match(/[0-9]/)) strength++;
            if (password.match(/[^a-zA-Z0-9]/)) strength++;
            
            // Remove all classes
            strengthFill.classList.remove('weak', 'medium', 'strong');
            
            if (password.length === 0) {
                strengthText.textContent = 'Password strength';
                strengthFill.style.width = '0%';
            } else if (strength <= 2) {
                strengthFill.classList.add('weak');
                strengthFill.style.width = '33%';
                strengthText.textContent = 'Weak password';
            } else if (strength <= 4) {
                strengthFill.classList.add('medium');
                strengthFill.style.width = '66%';
                strengthText.textContent = 'Medium password';
            } else {
                strengthFill.classList.add('strong');
                strengthFill.style.width = '100%';
                strengthText.textContent = 'Strong password';
            }
        });
    }
}

// Contact Form Handler (for home2.html contact form)
const contactFormHome = document.getElementById('contactForm');
if (contactFormHome && window.location.pathname.includes('home2')) {
    contactFormHome.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');
        
        // Trim inputs
        [nameInput, emailInput, phoneInput, messageInput].forEach(input => {
            if (input) trimInput(input);
        });
        
        const name = nameInput.value;
        const email = emailInput.value;
        const phone = phoneInput.value;
        const subject = subjectInput.value;
        const message = messageInput.value;
        
        let isValid = true;
        
        // Name validation
        const namePattern = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
        if (!name || !namePattern.test(name)) {
            nameInput.classList.add('is-invalid');
            isValid = false;
        } else {
            nameInput.classList.remove('is-invalid');
            nameInput.classList.add('is-valid');
        }
        
        // Email validation
        const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        if (!email || !emailPattern.test(email) || email.includes(' ')) {
            emailInput.classList.add('is-invalid');
            isValid = false;
        } else {
            emailInput.classList.remove('is-invalid');
            emailInput.classList.add('is-valid');
        }
        
        // Phone validation
        const phonePattern = /^[0-9]{10}$/;
        if (!phone || !phonePattern.test(phone)) {
            phoneInput.classList.add('is-invalid');
            isValid = false;
        } else {
            phoneInput.classList.remove('is-invalid');
            phoneInput.classList.add('is-valid');
        }
        
        // Subject validation
        if (!subject) {
            subjectInput.classList.add('is-invalid');
            isValid = false;
        } else {
            subjectInput.classList.remove('is-invalid');
            subjectInput.classList.add('is-valid');
        }
        
        // Message validation
        if (!message || message.length < 10) {
            messageInput.classList.add('is-invalid');
            isValid = false;
        } else {
            messageInput.classList.remove('is-invalid');
            messageInput.classList.add('is-valid');
        }
        
        if (isValid) {
            console.log('Contact Form:', { name, email, phone, subject, message });
            alert('Thank you! Your message has been sent successfully.');
            contactFormHome.reset();
            
            // Remove validation classes
            contactFormHome.querySelectorAll('.is-valid').forEach(el => el.classList.remove('is-valid'));
        }
    });
}

// Inquiry Form Handler
const inquiryForm = document.getElementById('inquiryForm');
if (inquiryForm) {
    inquiryForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nameInput = document.getElementById('inquiryName');
        const emailInput = document.getElementById('inquiryEmail');
        const phoneInput = document.getElementById('inquiryPhone');
        const messageInput = document.getElementById('inquiryMessage');
        
        // Trim inputs
        [nameInput, emailInput, phoneInput, messageInput].forEach(input => {
            if (input) trimInput(input);
        });
        
        const name = nameInput.value;
        const email = emailInput.value;
        const phone = phoneInput.value;
        const message = messageInput.value;
        
        let isValid = true;
        
        // Name validation
        const namePattern = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
        if (!name || !namePattern.test(name)) {
            nameInput.classList.add('is-invalid');
            isValid = false;
        } else {
            nameInput.classList.remove('is-invalid');
            nameInput.classList.add('is-valid');
        }
        
        // Email validation
        const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        if (!email || !emailPattern.test(email) || email.includes(' ')) {
            emailInput.classList.add('is-invalid');
            isValid = false;
        } else {
            emailInput.classList.remove('is-invalid');
            emailInput.classList.add('is-valid');
        }
        
        // Phone validation
        const phonePattern = /^[0-9]{10}$/;
        if (!phone || !phonePattern.test(phone)) {
            phoneInput.classList.add('is-invalid');
            isValid = false;
        } else {
            phoneInput.classList.remove('is-invalid');
            phoneInput.classList.add('is-valid');
        }
        
        // Message validation
        if (!message || message.length < 10) {
            messageInput.classList.add('is-invalid');
            isValid = false;
        } else {
            messageInput.classList.remove('is-invalid');
            messageInput.classList.add('is-valid');
        }
        
        if (isValid) {
            console.log('Inquiry Form:', { name, email, phone, message });
            alert('Thank you for your inquiry! We will contact you soon.');
            inquiryForm.reset();
            
            // Remove validation classes
            inquiryForm.querySelectorAll('.is-valid').forEach(el => el.classList.remove('is-valid'));
        }
    });
}

// Input Focus Effect
const formInputs = document.querySelectorAll('.input-with-icon .form-control');
formInputs.forEach(function(input) {
    input.addEventListener('focus', function() {
        const icon = this.parentElement.querySelector('i:not(.toggle-password i)');
        if (icon) {
            icon.style.color = 'var(--primary-color)';
        }
    });
    
    input.addEventListener('blur', function() {
        const icon = this.parentElement.querySelector('i:not(.toggle-password i)');
        if (icon) {
            icon.style.color = 'var(--text-secondary)';
        }
    });
});
