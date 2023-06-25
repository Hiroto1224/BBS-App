
export const fetcher = (url:string): Promise<any[]> => fetch(url,{method: 'Get', mode: "cors"}
).then(res => res.json())

export const roomDataFetcher = (url:string): Promise<any> => fetch(url,{method: 'Get', mode: "cors"}
).then(res => res.json())
