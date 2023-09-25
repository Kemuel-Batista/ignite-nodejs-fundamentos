// search=Kemuel&page=2
export function extractQueryParams(query) {
  // ['search=Kemuel', 'page=2']
  return query.substr(1).split('&').reduce((queryParams, param) => {
    // ['search', 'Kemuel']
    // ['page', '2']
    const [key, value] = param.split('=')

    queryParams[key] = value

    return queryParams
  }, {})
}