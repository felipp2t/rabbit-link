interface handleResetPasswordRequest {
  email: string;
  password: string;
  confirmPassword: string;
}

export async function handleResetPassword(data: handleResetPasswordRequest) {
  await fetch(
    import.meta.env.VITE_BACKEND_URL +
      `/api/forgot-password/reset-password?email=${data.email}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: data.password,
        confirmPassword: data.confirmPassword,
      }),
    },
  );

  location.href = "/auth";
}
