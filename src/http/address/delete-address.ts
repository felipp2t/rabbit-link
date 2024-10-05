export async function deleteAddress(addressId: string) {
  try {
    const token = localStorage.getItem("token");

    await fetch(`http://localhost:80/api/address/${addressId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error(error);
  }
}
