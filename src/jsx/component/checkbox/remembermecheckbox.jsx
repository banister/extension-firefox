import React, {Component} from 'react';
import PropType from 'prop-types';

import UncontrolledCheckbox from './uncontrolledcheckbox';

/**
 * Checkbox to toggle where user credentials are stored (memory/localStorage)
 *
 * Only one of these should exist on the view at a time
 */
class RememberMeCheckbox extends Component {
  constructor (props) {
    super(props);

    // Bindings
    this.onChange = this.onChange.bind(this);

    // Init
    const {remember, app: {util: {settings}}} = props;
    this.defaultChecked = remember && settings.getItem('rememberme');
  }

  onChange (checked) {
    const {user} = this.props.app.util;
    user.setRememberMe(checked);
  }

  render () {
    return (
      <div className={`remember-me-container`}>
        <UncontrolledCheckbox
          defaultChecked={this.defaultChecked}
          onChange={this.onChange}
          id="remember-checkbox"
        />
        <label htmlFor="remember-checkbox">{t(this.props.labelLocaleKey)}</label>
      </div>
    );
  }
}

RememberMeCheckbox.propTypes = {
  remember: PropType.bool,
  app: PropType.object.isRequired,
  labelLocaleKey: PropType.string.isRequired,
}

export default RememberMeCheckbox;
