interface SignOutRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  cpf: string;
  phone: string;
  birthDate: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  profilePicture?: any;
}

export interface SignOutResponse {
  token: string;
}

export async function handleSignUp(data: SignOutRequest) {
  await fetch(import.meta.env.VITE_BACKEND_URL + "/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: data.name,
      cpf: data.cpf,
      phone: data.phone,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      birthDate: data.birthDate,
      profilePicture: data.profilePicture,
    }),
  });
}
