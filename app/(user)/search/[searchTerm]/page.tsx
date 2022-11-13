import React from 'react'
import { SearchResults } from '../../../../typings';


type PageProps = {
  params: {
    searchTerm: string;
  }
}


const search = async (searchTerm: string) => {
  const res = await fetch(
    `https://serpapi.com/search.json?q=${searchTerm}&api_key=${process.env.API_KEY}`
  )

  const data: SearchResults = await res.json();
  return data
}
async function SearchResults({ params: { searchTerm } }: PageProps) {
  const searchResults = await search(searchTerm)
  return (
    <div>
      <p>You search for: {searchTerm}</p>
      <ol className='space-y-5 p-5'>
        {searchResults.organic_results.map((result) => (
          <li key={result.position} className="list-decimal">
            <p className='font-bold'>{result.title}</p>
            <p>{result.snippet}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default SearchResults
