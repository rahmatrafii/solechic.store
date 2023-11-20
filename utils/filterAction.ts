export function ganerateNameFilter(obj: {
  operator: string;
  type: string;
  param: string;
  value: string;
}) {
  let string = ``;
  if (!obj.value) return null;
  switch (obj.param) {
    case "contains":
      string = ` ${obj.operator ? obj.operator : ""} name match "*${
        obj.value
      }*"`;
      break;
    case "does not contain":
      string = ` ${obj.operator ? obj.operator : ""} !(name match "*${
        obj.value
      }*")`;
      break;
    case "begins":
      string = ` ${obj.operator ? obj.operator : ""} name match "${
        obj.value
      }*"`;
      break;
    case "does not begin":
      string = ` ${obj.operator ? obj.operator : ""} !(name match "${
        obj.value
      }*")`;
      break;
    case "ended":
      string = ` ${obj.operator ? obj.operator : ""} name match "${
        obj.value
      }$"`;
      break;
    case "not ended":
      string = ` ${obj.operator ? obj.operator : ""} !(name match "${
        obj.value
      }$")`;
      break;
  }
  return string;
}
export function ganeratePriceFilter(obj: {
  operator: string;
  type: string;
  from: string;
  to: string;
}) {
  let string;
  console.log(obj.operator);
  if (!obj.from && obj.to) {
    string = ` ${obj.operator ? obj.operator : ""} price <= ${obj.to}`;
  } else if (obj.from && !obj.to) {
    string = ` ${obj.operator ? obj.operator : ""} price >= ${obj.from}`;
  } else {
    string = ` ${obj.operator ? obj.operator : ""} price >= ${
      obj.from
    } && price <= ${obj.to}`;
  }

  return string;
}
export function ganerateRatingFilter(obj: {
  operator: string;
  type: string;
  param: string;
  value: string;
}) {
  let string = "";
  switch (obj.param) {
    case "higher":
      string = ` ${obj.operator ? obj.operator : ""} rate >= ${
        Number(obj.value) + 0.1
      }`;
      break;
    case "lower":
      string = ` ${obj.operator ? obj.operator : ""} rate <= ${
        Number(obj.value) - 0.1
      }`;
      break;
    case "equal":
      string = ` ${obj.operator ? obj.operator : ""} rate == ${obj.value}`;
      break;
  }
  return string;
}
export function ganerateCountryOfOriginFilter(obj: {
  type: string;
  param: string;
  value: string;
  operator: string;
}) {
  let string = "";
  switch (obj.param) {
    case "comes from":
      string = ` ${obj.operator ? obj.operator : ""} origin match "${
        obj.value
      }"`;
      break;
    case "did not come from":
      string = ` ${obj.operator ? obj.operator : ""} !(origin match "${
        obj.value
      }")`;
      break;
  }
  return string;
}
