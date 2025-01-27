type QueryParams = Record<string, string | number | undefined>;

export const buildQueryParams = (params: QueryParams) => {
  return Object.entries(params)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`,
    )
    .join("&");
};
