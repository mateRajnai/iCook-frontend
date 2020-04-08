import React, { useContext } from "react";
import RecipeListItem from "./RecipeListItem";
import { RecipeContext } from "../context/RecipeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHourglassHalf } from "@fortawesome/free-solid-svg-icons";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { Row, Layout, Typography } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";

const { Content } = Layout;
const { Title } = Typography;

const RecipeList = (props) => {
  const { recipes } = useContext(RecipeContext);
  const { loading } = useContext(RecipeContext);
  const { loadMoreRecipes } = useContext(RecipeContext);
  const { queryString } = useContext(RecipeContext);
  let content = null;

  if (loading) {
    content = (
      <Row justify="center" style={{ margin: "40px" }}>
        <FontAwesomeIcon
          icon={faHourglassHalf}
          spin
          size="8x"
        ></FontAwesomeIcon>
      </Row>
    );
  } else if (recipes.length !== 0) {
    content = (
      <Content>
        <InfiniteScroll
          dataLength={recipes.length - 1}
          next={loadMoreRecipes}
          hasMore={true}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
          releaseToRefreshContent={
            <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
          }
        >
          {recipes.map((recipe) => (
            <RecipeListItem key={recipe.uri} recipe={recipe} />
          ))}
        </InfiniteScroll>
      </Content>
    );
  } else if (queryString !== "") {
    content = (
      <React.Fragment>
        <Row justify="center" style={{ margin: "40px" }}>
          <FontAwesomeIcon
            icon={faExclamationCircle}
            spin
            size="8x"
            style={{ color: "orange" }}
          ></FontAwesomeIcon>
        </Row>
        <Row justify="center" style={{ margin: "40px" }}>
          <Title level={4}>
            Sorry, we found nothing! Please try to refine your search!
          </Title>
        </Row>
      </React.Fragment>
    );
  }
  return content;
};

export default RecipeList;
