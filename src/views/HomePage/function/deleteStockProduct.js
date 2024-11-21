// getStockProduct.js
async function fetchDeleteStockProduct(authToken, productId) {
  const response = await fetch(
    `http://localhost:8080/stock-product/${productId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    }
  );
  const data = await response.json();
  return data;
}

export async function deleteStockProduct(authToken, productId) {
  console.log("product id : ", productId);
  const response = await fetchDeleteStockProduct(authToken, productId);

  if (response.success) {
    return response.data;
  } else {
    throw new Error(response.message || "Failed to retrieve data product");
  }
}

export default deleteStockProduct;
