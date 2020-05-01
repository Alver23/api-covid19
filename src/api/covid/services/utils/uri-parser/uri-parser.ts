

export const uriParser = (query: { name: string, value: string | number }[]) => {
  let queryString = '';
  if (query && query.length > 0) {
    const params = [];
    query
      .forEach(item => {
        params.push(`${item.name}=${item.value}`);
      });
    queryString = params.join('&');
  }

  return queryString;
}
