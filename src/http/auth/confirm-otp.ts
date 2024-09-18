interface ConfirmOTPRequest {
  email: string;
  otp: string;
}

export async function handleConfirmOTP(data: ConfirmOTPRequest) {
  await fetch(import.meta.env.VITE_BACKEND_URL + "/api/confirm-otp", {
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
}
