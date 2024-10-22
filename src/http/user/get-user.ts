import { User } from "@/@types/user";

export async function getUser() {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:80/api/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const user: User = await response.json();
    return user;
  } catch (error) {
    console.log(error);
  }
}
