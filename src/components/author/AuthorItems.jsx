import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Skeleton from "../UI/Skeleton";
import NFTCard from "../UI/NFTcard";
import axios from "axios";

const AuthorItems = () => {
  const { authorId } = useParams();
  const [authorData, setAuthorData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAuthorData = async () => {
      try {
        const { data } = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
        );
        setAuthorData(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching new items:", error);
        setIsLoading(false);
      }
    };

    fetchAuthorData();
  }, [authorId]);

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {isLoading ? (
            <div>
              <Skeleton width="100px" height="100px" borderRadius="50%" />
              <Skeleton width="200px" height="20px" />
              <Skeleton width="150px" height="20px" />
              <Skeleton width="100px" height="20px" />
              {Array.from({ length: 8 }, (_, index) => (
                <Skeleton
                  key={index}
                  width="200px"
                  height="300px"
                  borderRadius="8px"
                />
              ))}
            </div>
          ) : (
            <>
              <div className="nft-collection">
              <div className="row">
                  {authorData.nftCollection.map((nft) => {
                    return (
                      <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={nft.id}>
                        <NFTCard nft={nft} authorImage={authorData.authorImage} authorId={authorData.authorId}/>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;