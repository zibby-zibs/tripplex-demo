import {client} from '../sanityConfig'
import { groq } from "next-sanity"

export const fetchCategories = async() =>{
    const query = groq 
    `*[_type == 'category' ]{
        ...,
    }`
    const categories = await client.fetch(query)


    return categories;
}