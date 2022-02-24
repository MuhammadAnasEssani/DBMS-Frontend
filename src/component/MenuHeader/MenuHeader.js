import React, { useEffect, useState } from 'react'
import { getCategories } from '../../config/api/categories';
import Notification from "../../component/notification/Notification";
import { Link } from 'react-router-dom';
import { RiArrowRightSLine } from "react-icons/ri";

export default function MenuHeader() {
  const [categories, setCategories] = useState([]);
    const getAllCategories = async() => {
      try{
        const res = await getCategories();
        if(res.status == 200){
          setCategories(res.data.categoryList)
        }else{
          Notification("Categories", "Something went wrong", "Error");
        }
      }catch(err){
        Notification("Categories", "Something went wrong", "Error");
      }
        // console.log(res)
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
                  {category.name}
                </Link>
                {/* <RiArrowRightSLine /> */}
                </>
              ) : (
                <span>{category.name}</span>
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
