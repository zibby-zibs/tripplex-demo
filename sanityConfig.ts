import { createClient } from 'next-sanity';
import ImageUrlBuilder from '@sanity/image-url';
export const config ={
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
    apiVersion: '2021-03-25',
    useCdn: true,
};

export const client = createClient(config);


export const urlFor = (source: any) => ImageUrlBuilder(client).image(source)