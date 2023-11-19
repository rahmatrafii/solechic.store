export function ganerateNameFilter(obj: {
  type: string;
  param: string;
  value: string;
}) {
  let string = ``;
  if (!obj.value) return null;
  switch (obj.param) {
    case "contains":
      string = `name match "*${obj.value}*"`;
      break;
    case "does not contain":
      string = `!(name match "*${obj.value}*")`;
      break;
    case "begins":
      string = `name match "${obj.value}*"`;
      break;
    case "does not begin":
      string = `!(name match "${obj.value}*")`;
      break;
    case "ended":
      string = `name match "${obj.value}$"`;
      break;
    case "not ended":
      string = `!(name match "${obj.value}$")`;
      break;
  }
  return string;
}
export function ganeratePriceFilter(obj: {
  type: string;
  from: string;
  to: string;
}) {
  let string;
  if (!obj.from && obj.to) {
    string = `price <= ${obj.to}`;
  } else if (obj.from && !obj.to) {
    string = `price >= ${obj.from}`;
  } else {
    string = `price >= ${obj.from} && price <= ${obj.to}`;
  }

  return string;
}
export function ganerateRatingFilter(obj: {
  type: string;
  param: string;
  value: string;
}) {
  let string = "";
  switch (obj.param) {
    case "higher":
      string = `rate >= ${Number(obj.value) + 0.1}`;
      break;
    case "lower":
      string = `rate <= ${Number(obj.value) - 0.1}`;
      break;
    case "equal to":
      string = `rate == ${obj.value}`;
      break;
  }
  return string;
}
export function ganerateCountryOfOriginFilter(obj: {
  type: string;
  param: string;
  value: string;
}) {
  let string = "";
  switch (obj.param) {
    case "comes from":
      string = `origin match "${obj.value}"`;
      break;
    case "did not come from":
      string = `!(origin match "${obj.value}")`;
      break;
  }
  return string;
}
