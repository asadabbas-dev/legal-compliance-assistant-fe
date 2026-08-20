'use client';

import PropTypes from 'prop-types';

/**
 * Auth screens (login / sign-up). Auth is not enforced yet, so these
 * routes render as-is with no redirect.
 */
export default function AuthMainRoutes({ component }) {
  return component;
}

AuthMainRoutes.propTypes = {
  component: PropTypes.element.isRequired
};
