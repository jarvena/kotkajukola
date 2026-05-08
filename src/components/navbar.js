import React from 'react';
import './navbar.css';
import { useTranslation } from 'react-i18next';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf, faLanguage } from '@fortawesome/free-solid-svg-icons';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import i18n from '../localization/i18n';

const handleLanguageChange = (event) => {
  const selectedLanguage = event.target.value;
  i18n.changeLanguage(selectedLanguage)
}

export default function Navbar(){
  const { t } = useTranslation();

  return (
    <div className="heading">
      <h1>{t('appTitle')}</h1>
      <div className='controls'>
        {/* <div className="download-button">
          <a href="./data/mikkelijukola_kilpailualuekartta.pdf">
          <FontAwesomeIcon icon={faFilePdf} />
          </a>
        </div> */}
        <div className='language-button'>
          <FormControl size='small'>
            <InputLabel sx={{color: 'white'}} id="language-select-label"><FontAwesomeIcon icon={faLanguage} fontSize={'x-large'} /></InputLabel>
            <Select
              labelId="language-select-label"
              id="language-select"
              label="Language"
              sx={{color: 'white', width: '55px'}}
              onChange={handleLanguageChange}
              defaultValue={""}
              inputProps={{ IconComponent: () => null, sx: { px: '0 !important' }}} // this part
              >
                <MenuItem value="fi">FI</MenuItem>
                <MenuItem value="en">EN</MenuItem>
                <MenuItem value="sv">SV</MenuItem>
              </Select>
          </FormControl>
        </div>
      </div>
    </div>
  );
}