const roles = (to, from, next) => {
  const role = localStorage.getItem("userRole");

  if (role === "ADMIN") next();
  else next("/dashboard");
  // alert('Permisson denied');
  if (role === "USER" || role === "ADMIN") {
    next();
  } else {
    next("/dashboard");
  }
};

export default roles;
