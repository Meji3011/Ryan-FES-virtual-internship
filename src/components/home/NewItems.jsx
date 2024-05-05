import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.min.css";
import "owl.carousel/dist/assets/owl.theme.default.min.css";
import Skeleton from "../UI/Skeleton";
import Timer from "../UI/Timer";
import NFTCard from "../UI/NFTcard";

const NewItems = () => {
  const [newItems, setNewItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchNewItems = async () => {
      try {
        const { data } = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );
        setNewItems(data);
        setIsLoaded(true);
      } catch (error) {
        console.error("Error fetching new items:", error);
        setIsLoaded(true);
      }
    };

    fetchNewItems();
  }, []);

  const options = {
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    navText: [
      '<span aria-label="Prev">‹</span>',
      '<span aria-label="Next">›</span>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      740: {
        items: 2,
      },
      1000: {
        items: 3,
      },
      1400: {
        items: 4,
      },
    },
  };

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <OwlCarousel className="owl-carousel" {...options}>
            {isLoaded
              ? Array.from({ length: 4 }).map((_, index) => (
                  <div className="nft__item" key={index}>
                    <div className="author_list_pp">
                      <Skeleton width="50px" height="50px" borderRadius="50%" />
                    </div>
                    <div className="nft__item_wrap">
                      <Skeleton
                        width="100%"
                        height="300px"
                        borderRadius="10px"
                      />
                    </div>
                    <div className="nft__item_info">
                      <Skeleton width="70%" height="20px" borderRadius="5px" />
                      <Skeleton width="50%" height="16px" borderRadius="5px" />
                    </div>
                  </div>
                ))
              : newItems.map((item) => <NFTCard key={item.id} item={item} />)}
          </OwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
