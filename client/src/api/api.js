// GET CLIENT BY ID
export async function getClientById(clientId) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/clients/${clientId}`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error(`Error: ${response.status} - ${response.statusText}`);
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

// GET USER LIST
export async function getUserList() {
  try {
    const response = await fetch("http://localhost:3000/api/users", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error(`Error: ${response.status} - ${response.statusText}`);
      return null;
    }
  } catch (error) {
    console.error(error);
  }
}

// Get User Appt
export async function getIndividualAppointment(apptId) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/appointment/${apptId}`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error(`Error: ${response.status} - ${response.statusText}`);
      return null;
    }
  } catch (err) {
    console.error(err);
  }
}

// Get individual user
export async function getIndividualUser(userId) {
  try {
    const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error(`Error: ${response.status} - ${response.statusText}`);
      return null;
    }
  } catch (err) {
    console.error(err);
  }
}
