interface ConfirmOTPRequest {
  email: string;
  otp: string;
}

export async function handleConfirmOTP(data: ConfirmOTPRequest) {
  try {
    await fetch("http://localhost:80/confirm-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify({
        otp: data.otp,
      }),
    });

    location.href = `/auth/reset-password?email=${data.email}`;
  } catch (error) {
    console.error(error);
  }
}
