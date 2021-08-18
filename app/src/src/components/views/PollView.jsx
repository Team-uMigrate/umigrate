import { SharedItemView } from './SharedItemView';

const PollView = ({ item, updateItem }) => {
  return (
    <SharedItemView item={item} updateItem={updateItem}>
      <PollOptions options={item.options} />
    </SharedItemView>
  );
};

export default PollView