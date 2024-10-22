interface sendEmailRequest {
  email: string;
}

export async function handleSendEmail(data: sendEmailRequest) {
  try {
    await fetch("http://localhost:80/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify({
        email: data.email,
      }),
    });

    const email = encodeURIComponent(data.email);
    location.href = `/auth/confirm-otp?email=${email}`;
  } catch (error) {
    console.error(error);
  }
}
