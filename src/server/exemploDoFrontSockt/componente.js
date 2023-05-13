import React, { useEffect, useState } from "react";
import "../cidades.css";
import SeviceCidades from "../../../services/Cidades";
import io from "../../../services/socket";
import Views from "./views";

export default function SeashCidade() {
  const [isCidades, setCidades] = useState([]);

  useEffect(() => {
    (async () => {
      const result = (await SeviceCidades.getCidades()).data;
      setCidades(result);
    })();
  }, []);

  useEffect(() => {
    const actionAvisoCreate = (payload) => {
      setCidades((itemAtual) => [...itemAtual, payload]);
    };
    io.on("@Create_cidade", actionAvisoCreate);

    return () => {
      io.off("@Create_cidade", actionAvisoCreate);
    };
  }, [io]);
  const dataViews = {
    isCidades,
  };
  return (
    <div>
      <Views dataViews={dataViews} />
    </div>
  );
}
