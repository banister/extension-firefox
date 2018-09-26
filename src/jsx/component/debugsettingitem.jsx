import React from 'react';
import PropTypes from 'prop-types';

const DebugSettingItem = ({onClick}) => {
  return (
    <div className='field settingitem noselect'>
      <div className="col-xs-12 dlviewbtn">
        <button className="col-xs-12 btn btn-success" onClick={onClick}>
          {t("ViewDebugLog")}
        </button>
      </div>
    </div>
  );
};

DebugSettingItem.propTypes = {
  onClick: PropTypes.func,
};

export default DebugSettingItem;
