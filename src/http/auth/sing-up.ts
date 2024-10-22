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
  try {
    await fetch("http://localhost:80/auth/register", {
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
  } catch (error) {
    console.error(error);
  }
}
