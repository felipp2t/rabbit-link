interface SignInRequest {
  email: string;
  password: string;
}

export interface SignInResponse {
  token: string;
}

export async function handleSignIn(data: SignInRequest) {
  const response = await fetch("http://localhost:80/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
    }),
  });

  const { token }: SignInResponse = await response.json();
  localStorage.setItem("token", token);
  location.href = "/";
}
