// getStockProduct.js
async function fetchEditStockProduct(authToken, dataReq) {
  const response = await fetch(
    `http://localhost:8080/stock-product/${dataReq.idProd}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        product_name: dataReq.productName,
        quantity: dataReq.quantity,
        status: dataReq.status,
      }),
    }
  );
  const data = await response.json();
  return data;
}

export async function editStockProduct(authToken, dataReq) {
  const response = await fetchEditStockProduct(authToken, dataReq);

  if (response.success) {
    return response.data;
  } else {
    throw new Error(response.message || "Failed to create data product");
  }
}

export default editStockProduct;
