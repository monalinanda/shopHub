import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
    projectId : "w1a46btq" ,
    dataset: "production" , 
    apiVersion: "2022-10-15",
    useCdn: true ,
    token: import.meta.env.VITE_PUBLIC_SANITY_TOKEN
})

const builder = imageUrlBuilder(client)

export const urlFor =(source) => builder.image(source) ;