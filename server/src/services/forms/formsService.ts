import FORMS from "../../constants/forms";

const getForms = (type: string) => {
  const result = FORMS.filter((form) => form.type === type);
  return result;
};

export default getForms;
