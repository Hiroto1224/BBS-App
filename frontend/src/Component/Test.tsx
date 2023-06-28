import React, { useEffect } from "react"
import useSWR from "swr";
import { fetcher } from "./fetcher";




export const Test =(props: any) => {

     const { data: sideBarData, error, isLoading } =
     useSWR<any[]>('http://localhost:8080/api/v1/roomData/sideBar', fetcher,{refreshInterval: 100})

    console.log(props)
    return props
}