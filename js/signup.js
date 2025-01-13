document.getElementById("signupForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://localhost:9090/api/auth/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username,
            email: email,
            password: password,
            role: ["ROLE_USER"], // Setting the default role
        }),
    });

    const message = document.getElementById("message");
    if (response.ok) {
        const data = await response.json();
        message.textContent = data.message;
        message.style.color = "green";
    } else {
        const errorData = await response.json();
        message.textContent = errorData.message || "Signup failed!";
        message.style.color = "red";
    }
});
