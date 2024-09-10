document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const userDetails = document.getElementById('userDetails');
    const logoutButton = document.getElementById('logoutButton');
    const bloodRequestForm = document.getElementById('bloodRequestForm');

    // Register User
    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const name = document.getElementById('name').value;
            const mail = document.getElementById('mail').value;
            const phone = document.getElementById('phone').value;
            const location = document.getElementById('location').value;
            const bloodGroup = document.getElementById('bloodGroup').value;
            const password = document.getElementById('password').value;

            let users = JSON.parse(localStorage.getItem('users')) || [];
            users.push({ name, mail, phone, location, bloodGroup, password });
            localStorage.setItem('users', JSON.stringify(users));

            alert('Registration successful!');
            window.location.href = 'login.html';
        });
    }

    // Login User
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const mail = document.getElementById('mail').value;
            const password = document.getElementById('password').value;

            let users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(user => user.mail === mail && user.password === password);

            if (user) {
                localStorage.setItem('loggedInUser', JSON.stringify(user));
                window.location.href = 'home.html';
            } else {
                alert('Invalid email or password');
            }
        });
    }

    // Home Page
    if (userDetails) {
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

        if (loggedInUser) {
            let users = JSON.parse(localStorage.getItem('users')) || [];

            userDetails.innerHTML = `
                <h2>Your Details</h2>
                <p>Name: ${loggedInUser.name}</p>
                <p>Email: ${loggedInUser.mail}</p>
                <p>Phone Number: ${loggedInUser.phone}</p>
                <p>Location: ${loggedInUser.location}</p>
                <p>Blood Group: ${loggedInUser.bloodGroup}</p>
                <h2>Available Blood Groups</h2>
                <ol>
                    ${users.map(user => `
                        <li>${user.name} - ${user.bloodGroup} - ${user.location}</li>
                    `).join('')}
                </ol>
            `;
        } else {
            window.location.href = 'login.html';
        }
    }

    // Request Blood
    if (bloodRequestForm) {
        bloodRequestForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const requestedBloodGroup = document.getElementById('requestedBloodGroup').value;
            let users = JSON.parse(localStorage.getItem('users')) || [];

            const matchingUsers = users.filter(user => user.bloodGroup === requestedBloodGroup);

            if (matchingUsers.length > 0) {
                alert(`Request sent to users with blood group ${requestedBloodGroup}`);
            } else {
                alert('No users found with the requested blood group');
            }
        });
    }

    // Logout
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            localStorage.removeItem('loggedInUser');
            window.location.href = 'login.html';
        });
    }
});
