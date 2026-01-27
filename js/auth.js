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

// Login Form Handler
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const remember = document.getElementById('remember').checked;
        
        console.log('Login:', { email, password, remember });
        
        // Show success message
        alert('Login successful! Redirecting...');
        
        // Redirect to home page
        setTimeout(function() {
            window.location.href = 'index.html';
        }, 1000);
    });
}

// Register Form Handler
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('regEmail').value;
        const phone = document.getElementById('phone').value;
        const password = document.getElementById('regPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const terms = document.getElementById('terms').checked;
        
        // Validate passwords match
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        
        // Validate terms
        if (!terms) {
            alert('Please accept the terms and conditions');
            return;
        }
        
        console.log('Register:', { firstName, lastName, email, phone, password });
        
        // Show success message
        alert('Registration successful! Please check your email to verify your account.');
        
        // Redirect to login page
        setTimeout(function() {
            window.location.href = 'login.html';
        }, 1000);
    });
    
    // Password Strength Checker
    const passwordInput = document.getElementById('regPassword');
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            const strengthFill = document.querySelector('.strength-fill');
            const strengthText = document.querySelector('.strength-text');
            
            let strength = 0;
            
            if (password.length >= 8) strength++;
            if (password.match(/[a-z]/)) strength++;
            if (password.match(/[A-Z]/)) strength++;
            if (password.match(/[0-9]/)) strength++;
            if (password.match(/[^a-zA-Z0-9]/)) strength++;
            
            // Remove all classes
            strengthFill.classList.remove('weak', 'medium', 'strong');
            
            if (strength <= 2) {
                strengthFill.classList.add('weak');
                strengthText.textContent = 'Weak password';
            } else if (strength <= 4) {
                strengthFill.classList.add('medium');
                strengthText.textContent = 'Medium password';
            } else {
                strengthFill.classList.add('strong');
                strengthText.textContent = 'Strong password';
            }
        });
    }
}

// Social Login Handlers
// const socialButtons = document.querySelectorAll('.social-btn');
// socialButtons.forEach(function(btn) {
//     btn.addEventListener('click', function() {
//         const provider = this.classList.contains('google') ? 'Google' : 'Facebook';
//         console.log('Social login with:', provider);
//         alert('Social login with ' + provider + ' (Not implemented in demo)');
//     });
// });

// Input Focus Effect
const formInputs = document.querySelectorAll('.input-with-icon .form-control');
formInputs.forEach(function(input) {
    input.addEventListener('focus', function() {
        this.parentElement.querySelector('i').style.color = 'var(--primary-color)';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.querySelector('i').style.color = 'var(--text-secondary)';
    });
});
