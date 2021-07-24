let userRole = module.exports;

const userRoles = (userRole.userRoles = {
  doge: 1,
  dogeKing: 2,
  superDogeKing: 4,
});

// config.accessLevels = {
//   doge: userRoles.doge | userRoles.dogeKing | userRoles.superDogeKing,
//   dogeKing: userRoles.dogeKing | userRoles.superDogeKing,
//   superDogeKing: userRoles.superDogeKing,
// };

userRole.accessLevels = {
  doge: userRoles.doge,
  dogeKing: userRoles.doge | userRoles.dogeKing,
  superDogeKing: userRoles.doge | userRoles.dogeKing | userRoles.superDogeKing,
};
