function buildQueryString(params) {
  const queryString = Object.keys(params)
    .filter(
      (key) =>
        params[key] !== undefined && params[key] !== null && params[key] !== ""
    )
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    )
    .join("&");

  return queryString ? `?${queryString}` : "";
}

async function fetchStockProduct(authToken, dataRequest) {
  const queryParams = {
    product_id: dataRequest.productId,
    page: dataRequest.currentPage,
    pageSize: dataRequest.rowsPerPage,
  };

  const queryString = buildQueryString(queryParams);
  const response = await fetch(
    `http://localhost:8080/stock-product${queryString}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    }
  );

  const data = await response.json();
  return data;
}

export async function getStockProduct(authToken, dataRequest) {
  const response = await fetchStockProduct(authToken, dataRequest);

  if (response.success) {
    return response.data;
  } else {
    throw new Error(response.message || "Failed to retrieve data product");
  }
}

export default getStockProduct;
