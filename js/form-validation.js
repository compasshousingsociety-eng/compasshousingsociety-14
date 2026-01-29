// /* ==========================================
//    SIMPLE FORM VALIDATION FOR GREENESTATE
//    ========================================== */

// document.addEventListener('DOMContentLoaded', function() {
    
//     // Toggle Password Visibility
//     window.togglePassword = function(fieldId) {
//         const field = document.getElementById(fieldId);
//         const button = field.nextElementSibling;
//         const icon = button.querySelector('i');
        
//         if (field.type === 'password') {
//             field.type = 'text';
//             icon.classList.remove('fa-eye');
//             icon.classList.add('fa-eye-slash');
//         } else {
//             field.type = 'password';
//             icon.classList.remove('fa-eye-slash');
//             icon.classList.add('fa-eye');
//         }
//     };
    
//     // Simple function to block spaces in input
//     function noSpaces(input) {
//         input.addEventListener('input', function() {
//             this.value = this.value.replace(/\s/g, '');
//         });
//     }
    
//     // Simple function to allow only letters and spaces (for names)
//     function onlyLetters(input) {
//         input.addEventListener('input', function() {
//             // Remove anything that's not a letter or space
//             this.value = this.value.replace(/[^A-Za-z\s]/g, '');
//             // Remove leading spaces
//             this.value = this.value.replace(/^\s+/, '');
//             // Remove multiple spaces
//             this.value = this.value.replace(/\s{2,}/g, ' ');
//         });
//     }
    
//     // Simple function to allow only numbers (for phone)
//     function onlyNumbers(input) {
//         input.addEventListener('input', function() {
//             this.value = this.value.replace(/\D/g, '').substring(0, 10);
//         });
//     }
    
//     // Simple function to trim on blur
//     function trimOnBlur(input) {
//         input.addEventListener('blur', function() {
//             this.value = this.value.trim();
//         });
//     }
    
    // Password strength
    function showPasswordStrength(input, strengthDiv) {
        input.addEventListener('input', function() {
            if (!strengthDiv) return;
            
            const password = this.value;
            const fill = strengthDiv.querySelector('.strength-fill');
            const text = strengthDiv.querySelector('.strength-text');
            
            if (!password) {
                fill.style.width = '0%';
                fill.className = 'strength-fill';
                text.textContent = 'Password strength';
                return;
            }
            
            let strength = 0;
            if (password.length >= 8) strength += 40;
            if (/[A-Z]/.test(password)) strength += 20;
            if (/[a-z]/.test(password)) strength += 20;
            if (/\d/.test(password)) strength += 20;
            
            fill.style.width = strength + '%';
            
            if (strength < 50) {
                fill.className = 'strength-fill weak';
                text.textContent = 'Weak';
            } else if (strength < 80) {
                fill.className = 'strength-fill medium';
                text.textContent = 'Medium';
            } else {
                fill.className = 'strength-fill strong';
                text.textContent = 'Strong';
            }
        });
    }
    
//     // ==========================================
//     // LOGIN FORM
//     // ==========================================
//     const loginForm = document.getElementById('loginForm');
//     if (loginForm) {
//         const email = document.getElementById('email');
//         const password = document.getElementById('password');
        
//         noSpaces(email);
//         noSpaces(password);
        
//         loginForm.addEventListener('submit', function(e) {
//             e.preventDefault();
            
//             let valid = true;
            
//             if (!email.value) {
//                 email.classList.add('is-invalid');
//                 valid = false;
//             } else {
//                 email.classList.remove('is-invalid');
//                 email.classList.add('is-valid');
//             }
            
//             if (!password.value || password.value.length < 6) {
//                 password.classList.add('is-invalid');
//                 valid = false;
//             } else {
//                 password.classList.remove('is-invalid');
//                 password.classList.add('is-valid');
//             }
            
//             if (valid) {
//                 alert('Login successful!');
//                 setTimeout(() => window.location.href = 'index.html', 1000);
//             }
//         });
//     }
    
//     // ==========================================
//     // REGISTER FORM
//     // ==========================================
//     const registerForm = document.getElementById('registerForm');
//     if (registerForm) {
//         const firstName = document.getElementById('firstName');
//         const lastName = document.getElementById('lastName');
//         const regEmail = document.getElementById('regEmail');
//         const phone = document.getElementById('phone');
//         const regPassword = document.getElementById('regPassword');
//         const confirmPassword = document.getElementById('confirmPassword');
//         const terms = document.getElementById('terms');
//         const strengthDiv = document.getElementById('passwordStrength');
        
//         onlyLetters(firstName);
//         trimOnBlur(firstName);
        
//         onlyLetters(lastName);
//         trimOnBlur(lastName);
        
//         noSpaces(regEmail);
        
//         onlyNumbers(phone);
        
//         noSpaces(regPassword);
//         showPasswordStrength(regPassword, strengthDiv);
        
//         noSpaces(confirmPassword);
        
//         registerForm.addEventListener('submit', function(e) {
//             e.preventDefault();
            
//             let valid = true;
            
//             // First Name
//             if (!firstName.value.trim() || firstName.value.trim().length < 2) {
//                 firstName.classList.add('is-invalid');
//                 valid = false;
//             } else {
//                 firstName.classList.remove('is-invalid');
//                 firstName.classList.add('is-valid');
//             }
            
//             // Last Name
//             if (!lastName.value.trim() || lastName.value.trim().length < 2) {
//                 lastName.classList.add('is-invalid');
//                 valid = false;
//             } else {
//                 lastName.classList.remove('is-invalid');
//                 lastName.classList.add('is-valid');
//             }
            
//             // Email
//             const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
//             if (!regEmail.value || !emailPattern.test(regEmail.value)) {
//                 regEmail.classList.add('is-invalid');
//                 valid = false;
//             } else {
//                 regEmail.classList.remove('is-invalid');
//                 regEmail.classList.add('is-valid');
//             }
            
//             // Phone
//             if (phone.value.length !== 10 || !/^[6-9]/.test(phone.value)) {
//                 phone.classList.add('is-invalid');
//                 const feedback = phone.parentElement.parentElement.querySelector('.invalid-feedback');
//                 if (feedback) {
//                     if (!/^[6-9]/.test(phone.value)) {
//                         feedback.textContent = 'Phone must start with 6, 7, 8, or 9.';
//                     } else {
//                         feedback.textContent = 'Phone number must be exactly 10 digits.';
//                     }
//                 }
//                 valid = false;
//             } else {
//                 phone.classList.remove('is-invalid');
//                 phone.classList.add('is-valid');
//             }
            
//             // Password
//             const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
//             if (!regPassword.value || !passwordPattern.test(regPassword.value)) {
//                 regPassword.classList.add('is-invalid');
//                 valid = false;
//             } else {
//                 regPassword.classList.remove('is-invalid');
//                 regPassword.classList.add('is-valid');
//             }
            
//             // Confirm Password
//             if (confirmPassword.value !== regPassword.value) {
//                 confirmPassword.classList.add('is-invalid');
//                 valid = false;
//             } else {
//                 confirmPassword.classList.remove('is-invalid');
//                 confirmPassword.classList.add('is-valid');
//             }
            
//             // Terms
//             if (!terms.checked) {
//                 alert('Please accept Terms & Conditions');
//                 valid = false;
//             }
            
//             if (valid) {
//                 alert('Registration successful!');
//                 setTimeout(() => window.location.href = 'login.html', 1000);
//             }
//         });
//     }
    
//     // ==========================================
//     // CONTACT FORM
//     // ==========================================
//     const contactForm = document.getElementById('contactForm');
//     if (contactForm) {
//         const name = document.getElementById('name');
//         const email = document.getElementById('email');
//         const phone = document.getElementById('phone');
//         const subject = document.getElementById('subject');
//         const message = document.getElementById('message');
        
//         onlyLetters(name);
//         trimOnBlur(name);
        
//         noSpaces(email);
        
//         onlyNumbers(phone);
        
//         trimOnBlur(message);
        
//         contactForm.addEventListener('submit', function(e) {
//             e.preventDefault();
            
//             let valid = true;
            
//             // Name
//             if (!name.value.trim()) {
//                 name.classList.add('is-invalid');
//                 valid = false;
//             } else {
//                 name.classList.remove('is-invalid');
//                 name.classList.add('is-valid');
//             }
            
//             // Email
//             const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
//             if (!email.value || !emailPattern.test(email.value)) {
//                 email.classList.add('is-invalid');
//                 valid = false;
//             } else {
//                 email.classList.remove('is-invalid');
//                 email.classList.add('is-valid');
//             }
            
//             // Phone
//             if (phone.value.length !== 10 || !/^[6-9]/.test(phone.value)) {
//                 phone.classList.add('is-invalid');
//                 const feedback = phone.parentElement.querySelector('.invalid-feedback');
//                 if (feedback) {
//                     if (!/^[6-9]/.test(phone.value)) {
//                         feedback.textContent = 'Phone must start with 6, 7, 8, or 9.';
//                     } else {
//                         feedback.textContent = 'Phone number must be exactly 10 digits.';
//                     }
//                 }
//                 valid = false;
//             } else {
//                 phone.classList.remove('is-invalid');
//                 phone.classList.add('is-valid');
//             }
            
//             // Subject
//             if (!subject.value) {
//                 subject.classList.add('is-invalid');
//                 valid = false;
//             } else {
//                 subject.classList.remove('is-invalid');
//                 subject.classList.add('is-valid');
//             }
            
//             // Message
//             if (!message.value.trim() || message.value.trim().length < 10) {
//                 message.classList.add('is-invalid');
//                 valid = false;
//             } else {
//                 message.classList.remove('is-invalid');
//                 message.classList.add('is-valid');
//             }
            
//             if (valid) {
//                 alert('Message sent successfully!');
//                 setTimeout(() => window.location.href = 'index.html', 1000);
//             }
//         });
//     }
// });
