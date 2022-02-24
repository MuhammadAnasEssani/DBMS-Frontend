import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import 'antd/dist/antd.css';
import "./App.css";
import Routers from "./config/routers/Routers";
import { persistor, store } from "../src/store/index";
import Header from "../src/component/header/Header";
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'
import cookies from 'js-cookie'
import classNames from 'classnames'
import Footer from "./component/Footer";
import SearchBar from "./component/Search_Bar/SearchBar";

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

  useEffect(() => {
    document.body.dir = currentLanguage.dir || 'ltr'
    document.title = t('app_title')
  }, [currentLanguage, t])

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Header lang={currentLanguage} />
        <SearchBar />
        <Routers />
      <Footer/>
      </PersistGate>
    </Provider>
  );
}

export default App;
