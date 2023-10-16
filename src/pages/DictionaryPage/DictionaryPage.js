import React, {useState } from 'react';
import Header from "../../components/Header/Header";
import Carousel from "../../components/LibraryCard/Carousel copy";
import "./DictionaryPage.module.css"
import axios from 'axios';


// const items = [
//   {
//       title: "제목 1",
//       description: "설명 1",
//   },
//   {
//       title: "제목 2",
//       description: "설명 2",
//   },
//   {
//       title: "제목 3",
//       description: "설명 3",
//   },
//   {
//       title: "제목 1",
//       description: "설명 1",
//   },
//   {
//       title: "제목 2",
//       description: "설명 2",
//   },
//   {
//       title: "제목 3",
//       description: "설명 3",
//   },
//   // 추가 아이템들...
// ];


function DictionaryPage() {

  return (
    <div>
      <Header name="사전" />
      {/* <Carousel items={items} active={0} /> */}
      <Carousel/>
    </div>
  );
} 

export default DictionaryPage;
