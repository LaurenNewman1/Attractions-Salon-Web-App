import { AbilityBuilder, Ability } from '@casl/ability';
import User from '../model/user';

export const userAbilities = (user) => {
  const { rules, can: allow } = AbilityBuilder.extract();

  // Not Logged In
  allow('read', 'Service');
  allow('read', 'Review');
  allow('create', 'Appointment');
  allow('create', 'User');
  allow('read', 'User', ['email', 'name', 'phone_number', 'role', 'title', 'banner', 'specialties']);

  // Logged In
  if (user) {
    allow('read', 'Self', ['_id', 'email', 'name', 'phone_number', 'role']);
    allow('reset_password', 'Self');
    allow('read', 'User', ['_id', 'email', 'name', 'phone_number', 'role'], { _id: user._id });
    allow('update', 'User', ['email', 'name', 'phone_number', 'password'], { _id: user._id });

    // Worker
    if (user.role > 0) {
      allow('view', 'AdminDashboard');
      allow('read', 'Appointment', { specialist: user._id });

      if (user.role > 1) {
        allow('manage', 'all');
      }
    }
  }

  return new Ability(rules);
};

export default async (req) => {
  if (!req.session) {
    return userAbilities(null);
  }
  const currentUser = await User.findById(req.session.userID).exec();
  return userAbilities(currentUser);
};