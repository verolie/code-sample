export async function fetchGetUser(formData) {
  const response = await fetch("http://localhost:8080/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: formData.username,
      password: formData.password,
    }),
  });

  const data = await response.json();
  return data;
}

export async function getUser(formData) {
  const response = await fetchGetUser(formData);

  if (response.success) {
    return response.data;
  } else {
    throw new Error(response.message || "Login failed");
  }
}
