import {client} from '../sanityConfig'
import { groq } from "next-sanity"

export const fetchBill = async(userId: string | undefined) =>{
    const query = groq 
    `*[_type == 'bill' && user._ref == ${userId}]{
        ...,
      }`
    const bill = await client.fetch(query)


    return bill;
}