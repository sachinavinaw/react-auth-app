import React, { FC } from "react";

type ErrorPageProps = {
  message: string;
};
const Error: FC<ErrorPageProps> = ({ message }) => {
  return (
    <div>
      <h1>Error!!!</h1>
      <p>{message}</p>
    </div>
  );
};

export default Error;
