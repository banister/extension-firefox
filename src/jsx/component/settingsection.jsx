import React, {Component} from 'react';
import PropTypes from 'prop-types';

import SettingItem from '../component/settingitem';

class SettingSection extends Component {
  constructor (props) {
    super(props);

    // Bindings
    this.toggleSection = this.toggleSection.bind(this);

    // Initialization
    this.state = {open: false};
  }

  /* ------------------------------------ */
  /*              Getters                 */
  /* ------------------------------------ */

  get settings () { return this.props.app.util.settings; }

  /* ------------------------------------ */
  /*               Events                 */
  /* ------------------------------------ */

  toggleSection () {
    this.setState(({open: prevOpen}) => ({open: !prevOpen}));
  }

  /* ------------------------------------ */
  /*               React                  */
  /* ------------------------------------ */

  render () {
    const { settingInfos } = this.props;

    return (
      <div className={`setting-section sectionwrapper ${this.state.open ? 'open' : 'closed'} ${this.props.name}`}>
        <div className='firstfield field' onClick={this.toggleSection}>
          <div className='col-xs-12 settingblock settingheader noselect'>
            <span className="sectiontitle col-xs-6">{this.props.label}</span>
            <div className="rightalign">
              <span className="counts">{this.props.enabledCount}/{this.props.totalCount} {t("enabled")}</span>
              <span className="expandicon"></span>
            </div>
          </div>
        </div>
        <div className="SettingItemContainer">
          { settingInfos.map((settingInfo) => {
              if (settingInfo.builder) {
                // Inject component
                const Builder = settingInfo.builder;
                return <Builder key={settingInfo.key} />;
              }
              else {
                // Build SettingItem from information
                return (
                  <SettingItem
                    app={this.props.app}
                    sectionName={this.props.name}
                    key={settingInfo.settingID}
                    checked={settingInfo.value}
                    controllable={settingInfo.controllable}
                    disabledValue={settingInfo.disabledValue}
                    tooltip={settingInfo.tooltip}
                    label={settingInfo.label}
                    warning={settingInfo.warning}
                    learnMore={settingInfo.learnMore}
                    learnMoreHref={settingInfo.learnMoreHref}
                    onSettingChange={this.props.onSettingChange}
                    settingID={settingInfo.settingID}
                  />
                );
              }
            })
          }
        </div>
      </div>
    );
  }
}

SettingSection.propTypes = {
  app: PropTypes.object.isRequired,
  enabledCount: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  settingInfos: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSettingChange: PropTypes.func,
};

export default SettingSection;
