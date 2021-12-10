import { classNames } from '../../../utils/classnames';
import React from 'react';

import { FontAwesomeIcon } from '../../foundation/FontAwesomeIcon';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

/**
 * @typedef {object} Props
 * @property {string | null} children
 */

/** @type {React.VFC<Props>} */
const ModalErrorMessage = ({ children }) => {
  return (
    <span className={classNames('block h-6 text-red-600', !children ? 'invisible' : '' )}>
      <span className="mr-1">
        <FontAwesomeIcon icon={faExclamationCircle} />
      </span>
      {children}
    </span>
  );
};

export { ModalErrorMessage };
