export async function getClientById(clientId) {
  try {
    const response = await fetch(
      "http://localhost:3000/api/clients/${clientId}",
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data.result;
    } else {
      console.error(`Error: ${response.status} - ${response.statusText}`);
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}
