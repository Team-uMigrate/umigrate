import React from "react";
import CommunityContainer from "./CreateCommunity/CommunityContainer";
import MarketContainer from "./CreateMarket/MarketContainer";
import HousingContainer from "./CreateHousing/HousingContainer";

const CreatePage = ({ route }) => {
  switch (route.params.page) {
    case "Community":
      return <CommunityContainer />;

    case "Market":
      return <MarketContainer />;

    case "Housing":
      return <HousingContainer />;

    default:
      break;
  }
};

export default CreatePage;
