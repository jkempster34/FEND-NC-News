export const changeTimeToAgo = datetime => {
  const now = new Date().getTime();
  const ago = new Date(datetime).getTime();
  const elapsed = now - ago;

  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;

  if (elapsed < msPerMinute) {
    return (
      Math.round(elapsed / 1000) +
      (Math.round(elapsed / 1000) === 1 ? " second ago" : " seconds ago")
    );
  } else if (elapsed < msPerHour) {
    return (
      Math.round(elapsed / msPerMinute) +
      (Math.round(elapsed / msPerMinute) === 1 ? " minute ago" : " minutes ago")
    );
  } else if (elapsed < msPerDay) {
    return (
      Math.round(elapsed / msPerHour) +
      (Math.round(elapsed / msPerHour) === 1 ? " hour ago" : " hours ago")
    );
  } else if (elapsed < msPerMonth) {
    return (
      "approximately " +
      Math.round(elapsed / msPerDay) +
      (Math.round(elapsed / msPerDay) === 1 ? " day ago" : " days ago")
    );
  } else if (elapsed < msPerYear) {
    return (
      "approximately " +
      Math.round(elapsed / msPerMonth) +
      (Math.round(elapsed / msPerMonth) === 1 ? " month ago" : " months ago")
    );
  } else {
    return (
      "approximately " +
      Math.round(elapsed / msPerYear) +
      (Math.round(elapsed / msPerYear) === 1 ? " year ago" : " years ago")
    );
  }
};
