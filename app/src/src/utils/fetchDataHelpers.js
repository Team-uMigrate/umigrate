export async function fetchAndMergeData(
  items,
  getItemsSet,
  nextPages,
  filtersList,
  isRefreshing,
  handleErrors
) {
  // Fetch a list of items from each endpoint
  let responseDataList = [];
  for (let i = 0; i < getItemsSet.length; i++) {
    try {
      responseDataList[i] = (
        await getItemsSet[i](nextPages[i], filtersList[i])
      ).data;
    } catch (error) {
      // Append error messages to state
      handleErrors(error);
      return;
    }
  }

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

  return { newItems, newNextPages };
}
