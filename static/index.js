document.getElementById('registerForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;

    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const result = await response.json();

        if (response.ok) {
            document.getElementById('registerMessage').innerText = result.message;
        } else {
            document.getElementById('registerMessage').innerText = result.message;
        }
    } catch (error) {
        document.getElementById('registerMessage').innerText = 'An error occurred.';
    }
});

document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const result = await response.json();

        if (response.ok) {
            window.location.href = '/dashboard';
        } else {
            document.getElementById('message').innerText = result.message;
        }
    } catch (error) {
        document.getElementById('message').innerText = 'An error occurred.';
    }
});
