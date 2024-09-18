interface createServiceRequest {
  title: string;
  price: number;
  description: string;
  category: string[];
  location: string;
  workType: "REMOTO" | "PRESENCIAL" | "HÍBRIDO";
}

export async function createService(data: createServiceRequest) {
  await fetch(import.meta.env.VITE_BACKEND_URL + "/api/services", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
    body: JSON.stringify({
      title: data.title,
      price: data.price,
      description: data.description,
      category: data.category,
      location: data.location,
      workType: data.workType,
    }),
  });

  location.href = "/meus-services";
}
