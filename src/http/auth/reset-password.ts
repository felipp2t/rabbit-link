interface handleResetPasswordRequest {
  email: string;
  password: string;
  confirmPassword: string;
}

export async function handleResetPassword(data: handleResetPasswordRequest) {
  try {
    await fetch(
      `http://localhost:80/forgot-password/reset-password?email=${data.email}`,
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
  } catch (error) {
    console.error(error);
  }
}
