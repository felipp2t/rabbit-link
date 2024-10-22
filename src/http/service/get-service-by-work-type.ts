interface GetServiceByWorkTypeProps {
  workType: 'REMOTE' | 'ONSITE';
}

export async function getServiceByWorkType({
  workType,
}: GetServiceByWorkTypeProps) {
  try {
    const token = localStorage.getItem('token');

    const response = await fetch(
      `http://localhost:80/api/services/work-type/${workType}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
