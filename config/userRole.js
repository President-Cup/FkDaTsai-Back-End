let userRole = module.exports;

const userRoles = (userRole.userRoles = {
  user: 1,
  admin: 2,
  superadmin: 4,
});

// config.accessLevels = {
//   doge: userRoles.doge | userRoles.dogeKing | userRoles.superDogeKing,
//   dogeKing: userRoles.dogeKing | userRoles.superDogeKing,
//   superDogeKing: userRoles.superDogeKing,
// };

/**
 * The access levels will be added up, copied from unknown tutorial.
 * 
 * user: 1,
 * admin: 1 + 2,
 * superadmin: 1 + 2 + 4,
*/
userRole.accessLevels = {
  user: userRoles.user,
  admin: userRoles.user | userRoles.admin,
  superadmin: userRoles.user | userRoles.admin | userRoles.superadmin,
};
