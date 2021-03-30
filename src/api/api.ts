import axios from 'axios'

const API_KEY = '21gSTDNq8HKyoR7x5Vg3TKPhhw8hqjI0'

export const instance = axios.create({
  baseURL: 'https://api.giphy.com/v1/'
})

export const giphyAPI = {
  searchGifs(query: string, limit: number | null = 10, offset: number | null = 0) {
    return instance.get<ResponseType>(
      `gifs/search?api_key=${API_KEY}&q=${query}&limit=${limit}&offset=${offset}&rating=g&lang=en`
    )
  },
  getTrending(limit: number | null = 12, offset: number | null = 0) {
    return instance.get<ResponseType>(
      `gifs/trending?api_key=${API_KEY}&limit=${limit}&offset=${offset}&rating=g&lang=en`
    )
  },

}

/*export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
  data: D
  messages: Array<string>
  resultCode: RC
}*/

export type ResponseType = {
  data: GifType[]
  pagination: ResponsePaginationType
  meta: ResponseMetaType
}

export type GifType = {
  images: any
  type : string
  id: string
  url: string
  slug: string
  bitly_gif_url: string
  bitly_url: string
  embed_url: string
  username: string
  source: string
  title: string
  rating: string
  content_url: string
  source_tld: string
  source_post_url: string
  is_sticker: number
  import_datetime: string
  trending_datetime: string
  locked: boolean
  order_index: number | undefined
}

export type ResponsePaginationType = {
  total_count: number,
  count: number,
  offset: number
}

export type ResponseMetaType = {
  status: number,
  msg: string,
  response_id: string
}