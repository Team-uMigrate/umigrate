import { AxiosResponse } from 'axios';

/**
 * Asynchronously fetches multiple lists of items from the API
 * and merges the lists together, sorting the items by their datetime_created property.
 * @param {object[]} items - An array of item objects
 * @param {(function(number, object): Promise<AxiosResponse>)[]} fetchItemsList - An array of asynchronous functions that each return an AxiosResponse.
 * Used to fetch each list of items.
 * @param {number[]} nextPages - An array of numbers that represent the next page number for each endpoint.
 * @param {object[]} filtersList - An array of filter objects. Used to filter each list of items.
 * @return {Promise<{ newItems, newNextPages, errors }>}
 * */
export async function fetchAndMergeItemsLists(
  items,
  fetchItemsList,
  nextPages,
  filtersList
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
  let maxEndDate = Date.parse("0");
  responseDataList.forEach((responseData) => {
    maxEndDate = Math.max(
      maxEndDate,
      Date.parse(
        responseData.results[responseData.results.length - 1]?.datetime_created ?? 0
      )
    );
  });

  let newItems = items;
  let newNextPages = nextPages;

  responseDataList.forEach((responseData, t) => {
    // Set next pages
    if (
      Date.parse(
        responseData.results[responseData.results.length - 1]?.datetime_created  ?? 0
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
            Date.parse(item.datetime_created ?? 0) >= maxEndDate &&
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
    (a, b) => Date.parse(b.datetime_created ?? 0) - Date.parse(a.datetime_created ?? 0)
  );

  return { newItems, newNextPages, errors: errors };
}
