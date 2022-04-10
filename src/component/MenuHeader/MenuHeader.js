import React, { useEffect, useState } from 'react'
import { getCategories } from '../../config/api/categories';
import Notification from "../../component/notification/Notification";
import { Link } from 'react-router-dom';
import { RiArrowRightSLine } from "react-icons/ri";
import { useTranslation } from "react-i18next";

export default function MenuHeader() {
  const [categories, setCategories] = useState([]);
  const { t } = useTranslation();

  const getAllCategories = async () => {
    try {
      const res = await getCategories();
      if (res.status == 200) {
        setCategories(res.data.categoryList)
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
          {category.parentId ? (
            <>
              <Link
                to={`/${category.slug}?cid=${category._id}&type=${category.type}`}
              >
                {/* {category.name} */}
                {t("lang") == "en" ? (
                  truncate(category.name, 12)
                ) : (
                  truncate(category.nameArabic, 12)
                )}
                {/* {truncate(category.name, 12)} */}
              </Link>
              {/* <RiArrowRightSLine /> */}
            </>
          ) : (
            t("lang") == "en" ? (
            <span>{category.name}</span>
            ) : (
              <span>{category.nameArabic}</span>
            )
          )}
          {category.children.length > 0 ? (
            <ul className="mega-box">{renderCategories(category.children)}</ul>
          ) : null}
        </li>
      );
    }
    return myCategories;
  };
  useEffect(() => {
    getAllCategories();
  }, []);
  console.log(categories)
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
