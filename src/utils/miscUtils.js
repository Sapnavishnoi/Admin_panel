import moment from "moment"

const days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const formatDate = (date, format="DD - MM - YYYY") => moment(date).format(format);

const startOfMonth = () => {
  let date = new Date();

  return new Date(date.getFullYear(), date.getMonth(), 1);
}

const JSONSearch = (list=[], keys=[], value) => {
  console.log(value)
  return list.filter((data, index) => {
    return Object.keys(data).some((key) => {
      if(keys.includes(key) && list[index][key])
        return list[index][key].toString().toLowerCase().includes(value.toLowerCase()) 
    })
  })
}


export {
  formatDate,
  startOfMonth,
  JSONSearch,
  days,
  months
};
