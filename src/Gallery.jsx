import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

const url =
  'https://api.unsplash.com/search/photos?client_id=J6lO-yqQQ-hYgDKu5JXj-aQYzkbYgjTy_YtJ6KZAB_w&query=office'

const Gallery = () => {
  const response = useQuery({
    queryKey: ['images'],
    queryFn: async () => {
      const result = await axios.get(url)
      // console.log(result)
      return result.data
    },
  })
  // console.log(response)
  if (response.isLoading) {
    return (
      <section className="image-container">
        <h4>Loading...</h4>
      </section>
    )
  }
  if (response.isError) {
    return (
      <section className="image-container">
        <h4>There was an error</h4>
      </section>
    )
  }
  const results = response.data.results
  if (results.length < 1) {
    return (
      <section className="image-container">
        <h4>No results</h4>
      </section>
    )
  }

  return (
    <section className="image-container">
      {results.map((item) => {
        const url = item?.urls?.regular
        console.log(url)
        return (
          <img
            src={url}
            key={item.id}
            alt={item.alt_description}
            className="img"
          ></img>
        )
      })}
    </section>
  )
}

export default Gallery
