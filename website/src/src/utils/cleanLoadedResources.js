const cleanLoadedResources = (list, data) => {
  let newData = [];

  for (let i = 0; i < data.length; i++) {
    let isUnique = true;
    let isNew = false;

    for (let j = list.length - 1; j >= 0; j--) {
      if (data[i].id === list[j].id) {
        isUnique = false;
        break;
      }

      else if (data[i].datetime_created > list[0].datetime_created) {
        isNew = true;
        break;
      }
    }

    if (isUnique && !isNew) {
      newData.push(data[i]);
    }
  }

  return [...list, ...newData];
};

export default cleanLoadedResources;
