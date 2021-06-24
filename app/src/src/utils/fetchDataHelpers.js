export async function fetchAndMergeData(
  items,
  getItemsSet,
  nextPages,
  filtersList,
  isRefreshing
) {
  // Fetch a list of items from each endpoint
  const responseDataList = [];
  const errors = [];
  await Promise.all(
    getItemsSet.map(async (getItems, i) => {
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
      newNextPages: getItemsSet.map(() => 1),
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
