import React from "react";

export default function MobileMenuHeader() {
    const [filter, setFilter] = useState(false)
  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push(
        category.children.length > 0 ? (
          <SubMenu key={category.id} title={category.name} onClick={() => {
            history.push(`/${category.slug}?cid=${category._id}&type=${category.type}`)
          }}>
            {renderCategories(category.children)}
          </SubMenu>
        ) : (
          <Menu.Item key={category.id} onClick={() => {
            history.push(`/${category.slug}?cid=${category._id}&type=${category.type}`)
          }}>{category.name}</Menu.Item>
        )
      );
    }
    return myCategories;
  };
  return (
    <>
      <div style={{ position: "relative" }}>
        <div
          className={
            filter
              ? "col-xl-3 col-lg-3 col-md-3 col-12 filter-sidebar"
              : "col-xl-3 col-lg-3 col-md-3 col-12 filter"
          }
        >
          <div className="side-bar">
            <Menu mode="inline" style={{ width: 230 }}>
              {category.categories.length > 0 &&
                renderCategories(category.categories)}
            </Menu>
          </div>
        </div>
      </div>
    </>
  );
}
