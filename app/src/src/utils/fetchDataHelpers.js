/**
 * A function that asynchronously fetches multiple lists of items from the API
 * and merges the lists together, sorting the items by their datetime_created property.
 * @param items - An array of item objects
 * @param fetchItemsList - An array of asynchronous functions that each return an AxiosResponse.
 * Used to fetch each list of items.
 * @param nextPages - An array of numbers that represent the next page number for each endpoint.
 * @param filtersList - An array of filter objects. Used to filter each list of items.
 * @param isRefreshing - A boolean value indicating whether to refresh the feed
 * */
export async function fetchAndMergeItemsLists(
  items,
  fetchItemsList,
  nextPages,
  filtersList,
  isRefreshing
) {
  // Fetch a list of items from each endpoint
  const responseDataList = [];
  const errors = [];
  await Promise.all(
    fetchItemsList.map(async (getItems, i) => {
      try {
        responseDataList[i] = (
          await getItems(nextPages[i], filtersList[i])
        ).data;
      } catch (error) {
        // Append error message
        errors.push(error);
      }
    })
  );

  if (errors.length)
    return {
      newItems: [],
      newNextPages: fetchItemsList.map(() => 1),
      errors: errors,
    };

  // Find the max end date between the results from all endpoints
  let maxEndDate = 0;
  responseDataList.forEach((responseData) => {
    maxEndDate = Math.max(
      maxEndDate,
      Date.parse(
        responseData.results[responseData.results.length - 1]?.datetime_created
      ) ?? null
    );
  });

  let newItems = isRefreshing ? [] : items;
  let newNextPages = nextPages;

  responseDataList.forEach((responseData, t) => {
    // Set next pages
    if (
      Date.parse(
        responseData.results[responseData.results.length - 1]?.datetime_created
      ) >= maxEndDate &&
      responseData.next
    ) {
      newNextPages[t] = nextPages[t] + 1;
    }

    // Add results from each endpoint to items
    newItems = newItems.concat(
      responseData.results
        // Filter out items created before max end date and duplicate items
        .filter(
          (item) =>
            Date.parse(item.datetime_created) >= maxEndDate &&
            !items.find((stateItem) => {
              return stateItem.id === item.id && stateItem.type === t;
            })
        )
        // Add type to each item
        .map((item) => ({ ...item, type: t }))
    );
  });

  // Sort items by date and time created descending
  newItems = newItems.sort(
    (a, b) => Date.parse(b.datetime_created) - Date.parse(a.datetime_created)
  );

  return { newItems, newNextPages, errors: errors };
}
