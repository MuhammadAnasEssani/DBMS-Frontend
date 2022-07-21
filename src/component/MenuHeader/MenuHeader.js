import React, {useEffect, useState} from 'react'
import {getCategories} from '../../config/api/categories';
import Notification from "../../component/notification/Notification";
import {useTranslation} from "react-i18next";
import {useHistory} from "react-router-dom";

export default function MenuHeader() {
  const [categories, setCategories] = useState([]);
  const { t } = useTranslation();
  const history = useHistory();

  const getAllCategories = async () => {
    try {
      const res = await getCategories();
      if (res.status == 200) {
        setCategories(res.data.data)
      } else {
        Notification("Categories", "Something went wrong", "Error");
      }
    } catch (err) {
      Notification("Categories", "Something went wrong", "Error");
    }
    // console.log(res)
  }
  const truncate = (string, n) => {
    return string?.length > n ? string.substr(0, n - 1) + '..' : string
  }
  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push(
          <li key={category.name}>
            {/*{category.parentId ? (*/}
            {/*    <>*/}
            {/*      <Link*/}
            {/*          to={`/${category.slug}?cid=${category._id}&type=${category.type}`}*/}
            {/*      >*/}
            {/*        {truncate(category.name, 12)}*/}
            {/*        /!* {truncate(category.name, 12)} *!/*/}
            {/*      </Link>*/}
            {/*      /!* <RiArrowRightSLine /> *!/*/}
            {/*    </>*/}
            {/*) : (*/}
            {/*<Link*/}
            {/*    to={`/${category.id}?cid=${category.id}&type=${category.type}`}*/}
            {/*>*/}
            <span onClick={()=> history.push(`/product-by-category/${category.id}`)}>{category.name}</span>
            {/*</Link>*/}
            {/*)}*/}

          </li>
      );
    }
    return myCategories;
  };
  useEffect(() => {
    getAllCategories();
  }, []);
  return (
      <div className='menuHeader'>
        <ul>
          {categories.length > 0
              ? renderCategories(categories)
              : null}
        </ul>
      </div>
  )
}
