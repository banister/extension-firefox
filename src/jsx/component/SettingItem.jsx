import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Checkbox from './checkbox';

class SettingItem extends Component {
  constructor(props) {
    super(props);

    const background = browser.extension.getBackgroundPage();
    if (background) { this.app = background.app; }
    else { this.app = window.app; }

    // properties
    this.settings = this.app.util.settings;

    // bindings
    this.toggle = this.toggle.bind(this);
    this.buildLabel = this.buildLabel.bind(this);
    this.buildWarningSpan = this.buildWarningSpan.bind(this);
  }

  /* ------------------------------------ */
  /*               Events                 */
  /* ------------------------------------ */

  async toggle() {
    const { controllable, settingID } = this.props;

    if (!controllable) { return; }

    try {
      // change settings in background app
      const newValue = await this.settings.toggle(settingID);
      // call parent function to update parent's state
      const { sectionName, onSettingChange } = this.props;
      if (onSettingChange) { onSettingChange(settingID, newValue); }
    }
    catch (err) {
      console.error(err);
      debug(err);
    }
  }

  /* ------------------------------------ */
  /*             Builders                 */
  /* ------------------------------------ */

  buildWarningSpan() {
    const { controllable, settingID, warning } = this.props;

    if (controllable) { return null; }

    let message = null;
    let setting = null;

    try { setting = this.settings.getApiSetting(settingID); }
    catch (_) { setting = undefined; }

    if (warning) { message = warning; }
    else if (setting) {
      let localeKey;
      switch (setting.getLevelOfControl()) {
        case 'controlled_by_other_extensions':
          localeKey = 'SettingControlledByOther';
          break;

        case 'not_controllable':
          localeKey = 'SettingNotControllable';
          break;

        default:
          throw new Error(`No such localeKey for ${setting.getLevelOfControl()}`);
      }
      message = t(localeKey);
    }

    if (!message) { throw new Error('Failed to generate warning message'); }

    return (
      <span className="errorsubline">
        { message }
      </span>
    );
  }

  buildLabel() {
    const {
      label,
      tooltip,
      settingID,
      learnMore,
      controllable,
      learnMoreHref,
    } = this.props;
    const WarningSpan = this.buildWarningSpan;
    const target = learnMoreHref === '#' ? undefined : '_blank';
    const classNames = controllable ? 'controllable-setting' : 'uncontrollable-setting';

    return (
      <div>
        <a href={settingID} className="macetooltip">
          <label
            htmlFor={settingID}
            className={classNames}
          >
            { label }
            <div className="popover arrow-bottom">
              { tooltip }
            </div>
          </label>
        </a>

        <WarningSpan />

        <div className={settingID}>
          <a className="learnmore" href={learnMoreHref} target={target}>
            { learnMore }
          </a>
        </div>
      </div>
    );
  }

  /* ------------------------------------ */
  /*               React                  */
  /* ------------------------------------ */

  render() {
    const {
      checked,
      settingID,
      controllable,
      disabledValue,
    } = this.props;

    const isChecked = controllable ? checked : Boolean(disabledValue);

    return (
      <div className="field settingitem noselect">
        <div className="col-xs-10 settingblock">
          { this.buildLabel() }
        </div>
        <Checkbox
          id={settingID}
          className="col-xs-2"
          checked={isChecked}
          disabled={!controllable}
          onChange={this.toggle}
        />
      </div>
    );
  }
}

SettingItem.propTypes = {
  settingID: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  tooltip: PropTypes.string,
  onSettingChange: PropTypes.func.isRequired,
  learnMoreHref: PropTypes.string,
  learnMore: PropTypes.string,
  controllable: PropTypes.bool,
  warning: PropTypes.string,
  sectionName: PropTypes.string.isRequired,
  disabledValue: PropTypes.bool,
  checked: PropTypes.bool.isRequired,
};

SettingItem.defaultProps = {
  controllable: true,
  tooltip: '',
  learnMoreHref: '#',
  learnMore: '',
  warning: '',
  disabledValue: false,
};

export default SettingItem;
