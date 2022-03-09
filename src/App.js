import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import 'antd/dist/antd.css';
import "./App.css";
import Routers from "./config/routers/Routers";
import Header from "../src/component/header/Header";
import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie'
import Footer from "./component/Footer";
import SearchBar from "./component/Search_Bar/SearchBar";
import { updateCart } from "./store/actions";
import EcommerceHeader from "./component/EcommerceHeader/EcommerceHeader";
import Bannar from "./component/Bannar/Bannar";

const languages = [
  {
    code: 'en',
    name: 'English',
    country_code: 'gb',
  },
  {
    code: 'ar',
    name: 'العربية',
    dir: 'rtl',
    country_code: 'sa',
  },
]

function App() {
  const currentLanguageCode = cookies.get('i18next') || 'en'
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode)
  const { t } = useTranslation()

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    {auth.authenticate && dispatch(updateCart());}
  }, [auth.authenticate]);

  useEffect(() => {
    document.body.dir = currentLanguage.dir || 'ltr'
    document.title = t('app_title')
  }, [currentLanguage, t])

  return (
    <>
        <EcommerceHeader />
        <Header lang={currentLanguage} />
        <SearchBar />
        <Routers />
      <Footer/>
      </>
  );
}

export default App;
