import React, { useEffect, useState } from "react";
import { useTranslation, Trans, initReactI18next } from "react-i18next";
import "./i18n";
import i18next from "i18next";
import { Form } from "react-bootstrap";
const Languagei18next = () => {
  const { t, i18n } = useTranslation();

  const [lang, setNewLang] = useState("en");
  useEffect(() => {
    i18next.changeLanguage(lang, (err, t) => {
      if (err) return console.log("something went wrong loading", err);
      t("key"); // -> same as i18next.t
    });
  }, [lang]);
  return (
    <>
      <h1>{t("Welcome to React")}</h1>
      <Form.Select
        aria-label="Default select example"
        onChange={(e) => setNewLang(e.target.value)}
      >
        <option>select any language (default english)</option>
        <option value="en">English</option>
        <option value="fr">French</option>
        <option value="hi">Hindi</option>
        <option value="gr">German</option>
      </Form.Select>
    </>
  );
};

export default Languagei18next;
