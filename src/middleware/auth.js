const authenticated = (to, from, next) => {
  const role = localStorage.getItem("userRole");
  console.log('role: ', role);
  let accessToken = document.cookie;
  // console.log(accessToken);
  if (accessToken && role) {
    document.cookie = `accessToken=${document.cookie};max-age=${30 * 60}`;
    next();
  } else {
    next("/login");
  }
};

module.exports = authenticated;
