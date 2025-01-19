import { useState } from "react";
import useGetForms from "../hooks/useGetForms";

const agreements = [
  {
    id: "1",
    title: "This is agreement-1",
  },
  {
    id: "2",
    title: "This is agreement-2",
  },
];

const AgreementPage = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  const { data: forms } = useGetForms(isEnabled);

  const hanldeGetForms = () => {
    setIsEnabled(true);
  };

  if (forms) {
    console.log("forms: ", forms);
  }

  return (
    <div>
      <h1>Agreement Page</h1>
      <div>
        {agreements.map((agreement) => {
          return (
            <div key={agreement.id}>
              <span>{agreement.id}</span>
              <span>{agreement.title}</span>
            </div>
          );
        })}
      </div>
      <button onClick={hanldeGetForms}>Get Forms</button>
    </div>
  );
};

export default AgreementPage;
