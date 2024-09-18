import { User } from "@/types/user";

interface getUserRequest {
  token: string;
}

export async function getUser(data: getUserRequest) {
  const response = await fetch(
    `https://a34e-201-76-2-12.ngrok-free.app/api/user/me`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
        Authorization: "Bearer " + data.token,
      },
    },
  );

  const user: User = await response.json();
  return user;
}
