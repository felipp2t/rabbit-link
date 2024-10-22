import { Education } from "@/@types/education";

type updateUserProps = {
  profilePicture?: unknown;
  phone: string;
  biography: string;
  education: Education[];
};

export async function updateUser(data: updateUserProps) {
  try {
    const token = localStorage.getItem("token");

    await fetch("http://localhost:80/api/users", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        profilePicture: data.profilePicture,
        phone: data.phone,
        description: data.biography,
        education: data.education,
      }),
    });
  } catch (error) {
    console.error(error);
  }
}
