import React from "react";
import BeerItem from "../../components/Beer/BeerItem";

const beerList = [
  { name: "호가든", id: "a", kind: "과일맥주", alcohol: "4.5", origin: "덴마크" },
  { name: "서머스비", id: "b", kind: "과일맥주", alcohol: "4.5", origin: "덴마크" },
  { name: "서머스비", id: "c", kind: "과일맥주", alcohol: "4.5", origin: "덴마크" },
  { name: "서머스비", id: "d", kind: "과일맥주", alcohol: "4.5", origin: "덴마크" },
  { name: "서머스비", id: "e", kind: "과일맥주", alcohol: "4.5", origin: "덴마크" },
  { name: "서머스비", id: "f", kind: "과일맥주", alcohol: "4.5", origin: "덴마크" },
  { name: "곰표", id: "g", kind: "과일맥주", alcohol: "4.5", origin: "덴마크" },
  { name: "서머스비", id: "h", kind: "과일맥주", alcohol: "4.5", origin: "덴마크" },
];

class BeerDetailsSimilar extends React.Component {
  render() {
    return (
      <div className="beerdetails-similar">
        <h3>이 맥주와 비슷해요</h3>
        <div className="similar-beerlist">
          {beerList.map((beer, index) => (
            <div key={index} className="similar-beeritem">
              <BeerItem beer={beer} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default BeerDetailsSimilar;
