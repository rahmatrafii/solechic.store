export function ganerateNameFilter({
  operator,
  param,
  type,
  value,
}: {
  operator: string;
  type: string;
  param: string;
  value: string;
}) {
  let string = ``;
  if (!value) return null;
  switch (param) {
    case "contains":
      string = `${
        operator && operator == "AND"
          ? " && "
          : operator && operator == "OR"
          ? " || "
          : ""
      } name match "*${value}*"`;
      break;
    case "does not contain":
      string = `${
        operator && operator == "AND"
          ? " && "
          : operator && operator == "OR"
          ? " || "
          : ""
      } !(name match "*${value}*")`;
      break;
    case "begins":
      string = `${
        operator && operator == "AND"
          ? " && "
          : operator && operator == "OR"
          ? " || "
          : ""
      } name match "${value}*"`;
      break;
    case "does not begin":
      string = `${
        operator && operator == "AND"
          ? " && "
          : operator && operator == "OR"
          ? " || "
          : ""
      } !(name match "${value}*")`;
      break;
    case "ended":
      string = `${
        operator && operator == "AND"
          ? " && "
          : operator && operator == "OR"
          ? " || "
          : ""
      } name match "${value}$"`;
      break;
    case "not ended":
      string = `${
        operator && operator == "AND"
          ? " && "
          : operator && operator == "OR"
          ? " || "
          : ""
      } !(name match "${value}$")`;
      break;
  }
  return string;
}
export function ganeratePriceFilter({
  from,
  operator,
  to,
  type,
}: {
  operator: string;
  type: string;
  from: string;
  to: string;
}) {
  let string;
  if (from && to) {
    string = `${
      operator && operator == "AND"
        ? " && "
        : operator && operator == "OR"
        ? " || "
        : ""
    } price >= ${from} && price <= ${to}`;
  } else if (from && !to) {
    string = `${
      operator && operator == "AND"
        ? " && "
        : operator && operator == "OR"
        ? " || "
        : ""
    } price >= ${from}`;
  } else if (!from && to) {
    string = `${
      operator && operator == "AND"
        ? " && "
        : operator && operator == "OR"
        ? " || "
        : ""
    }  price <= ${to}`;
  }

  return string;
}
export function ganerateRatingFilter({
  operator,
  param,
  type,
  value,
}: {
  operator: string;
  type: string;
  param: string;
  value: string;
}) {
  let string = "";
  switch (param) {
    case "higher":
      string = `${
        operator && operator == "AND"
          ? " && "
          : operator && operator == "OR"
          ? " || "
          : ""
      } rate >= ${Number(value) + 0.1}`;
      break;
    case "lower":
      string = `${
        operator && operator == "AND"
          ? " && "
          : operator && operator == "OR"
          ? " || "
          : ""
      } rate <= ${Number(value) - 0.1}`;
      break;
    case "equal":
      string = `${
        operator && operator == "AND"
          ? " && "
          : operator && operator == "OR"
          ? " || "
          : ""
      } rate == ${value}`;
      break;
  }
  return string;
}
export function ganerateCountryOfOriginFilter({
  operator,
  param,
  type,
  value,
}: {
  type: string;
  param: string;
  value: string;
  operator: string;
}) {
  let string = "";
  switch (param) {
    case "comes from":
      string = `${
        operator && operator == "AND"
          ? " && "
          : operator && operator == "OR"
          ? " || "
          : ""
      } origin match "${value}"`;
      break;
    case "did not come from":
      string = `${
        operator && operator == "AND"
          ? " && "
          : operator && operator == "OR"
          ? " || "
          : ""
      } !(origin match "${value}")`;
      break;
  }
  return string;
}
