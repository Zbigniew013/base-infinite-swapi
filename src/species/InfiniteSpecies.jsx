import InfiniteScroll from 'react-infinite-scroller';
import { Species } from './Species';
import { useInfiniteQuery } from 'react-query';

const initialUrl = 'https://swapi.dev/api/species/';
const fetchUrl = async url => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  // TODO: get data for InfiniteScroll via React Query
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    error,
    isFetching,
  } = useInfiniteQuery(
    'sw-species',
    ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    {
      getNextPageParam: lastPage => lastPage.next || undefined,
    }
  );

  if (isLoading) return <h1 className='loading'>Loading...</h1>;
  if (isError)
    return (
      <>
        <h1>Ooops... Soemthing went wrong...</h1>
        <p>{error.toString()}</p>
      </>
    );

  return (
    <>
      {isFetching && <h1 className='loading'>Loading...</h1>}
      <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
        {data.pages.map(pageData =>
          pageData.results.map(species => (
            <Species
              key={species.name}
              name={species.name}
              language={species.language}
              averageLifespan={species.average_lifespan}
            />
          ))
        )}
      </InfiniteScroll>
    </>
  );
}
