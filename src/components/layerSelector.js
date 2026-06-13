import { useState } from 'react';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup, faXmark} from '@fortawesome/free-solid-svg-icons';

import { useTranslation } from 'react-i18next';

const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor: 'red'
}));

const setOverlayVisibility = (event, overlayVisibilityState, layersToSet) => {
  const { overlayVisibility, setOverlayVisibility } = overlayVisibilityState;
  const newVisibility = layersToSet.reduce((acc, layer) => {
    acc[layer] = event.target.checked ? 'visible' : 'none';
    return acc;
  }
  , {...overlayVisibility});
  setOverlayVisibility(newVisibility);
};

export default function LayerSelector({bgState, overlayVisibilityState}) {
  const { bgMap, setBgMap } = bgState;
  const [open, setOpen] = useState(false);
  const toggleDrawer = (newStatus = !open) => {
    setOpen(newStatus);
  };

  const { t } = useTranslation();

  return(
    <Root>
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            overflow: 'visible',
          },
        }}
      />
      <Box
        sx={{
          position: 'fixed',
          bottom: 29,
          right: 9,
          backgroundColor: 'white',
          borderRadius: '4px',
          boxShadow: 2,
          p: 0,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 29,
          height: 29,
          border: '1px solid #ccc',
          transition: 'box-shadow 0.2s, opacity 0.2s',
          opacity: open ? 0 : 1,
          pointerEvents: open ? 'none' : 'auto',
          '&:hover': {
            boxShadow: 4,
            backgroundColor: '#f8f8f8',
          },
          zIndex: 1301,
        }}
        onClick={() => toggleDrawer(true)}
        aria-label="Layer selector"
      >
        <FontAwesomeIcon icon={faLayerGroup} color="#333" />
      </Box>

      <SwipeableDrawer
        anchor='bottom'
        open={open}
        onOpen={() => toggleDrawer(true)}
        onClose={() => toggleDrawer(false)}
        swipeAreaWidth={40}
        ModalProps={{
          keepMounted: true,
        }}
        PaperProps={{
          sx: {
            backgroundColor: '#111',
            color: 'white',
          }
        }}
      >
        <Box sx={{ 
          width: `calc(100vw - 10px)`, 
          margin: '5px', 
          textAlign: 'center', 
          backgroundColor: '#333', 
          color: 'white', 
          borderRadius: '4px', 
          padding: '5px 0',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          userSelect: 'none',
        }}>
          <b style={{ flex: 1 }}>{t('mapLayers')}</b>
          <Box
            sx={{
              position: 'absolute',
              right: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              cursor: 'pointer',
              color: 'white',
              fontSize: 22,
              lineHeight: 1,
              padding: '0 4px',
              borderRadius: '50%',
              '&:hover': {
                backgroundColor: '#444',
              },
            }}
            onClick={() => toggleDrawer(false)}
            aria-label="Sulje"
          >
            <FontAwesomeIcon icon={faXmark} color='white'/>
          </Box>
        </Box>
        <Box display="flex" flexWrap="wrap" alignItems="flex-start">
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <FormLabel sx={{ color: 'white' }} id="bgmap-radio-buttons-group-label">{t('backgroundMap')}</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              value={bgMap}
              onChange={(e) => setBgMap(e.target.value)}
              name="radio-buttons-group"
            >
              <FormControlLabel value="MapAnt" control={<Radio sx={{ color: 'white' }} />} label="MapAnt" />
              <FormControlLabel value="gSat" control={<Radio sx={{ color: 'white' }}/>} label={t('Satellite')} />
            </RadioGroup>
          </FormControl>
          <FormGroup sx={{ m: 1, minWidth: 120 }}>
            <FormLabel id="overlay-checkbox-group-label" sx={{color: 'white'}}>{t('overlays')}</FormLabel>
            <FormControlLabel control={<Checkbox defaultChecked onChange={(e) => setOverlayVisibility(e, overlayVisibilityState, ['oldMap'])} sx={{ color: 'white' }}/>} label={t('oldMap')} />
            <FormControlLabel control={<Checkbox defaultChecked onChange={(e) => setOverlayVisibility(e, overlayVisibilityState, ['venla'])} sx={{ color: 'white' }}/>} label={t('venlamap')} />
            <FormControlLabel control={<Checkbox defaultChecked onChange={(e) => setOverlayVisibility(e, overlayVisibilityState, ['arena'])} sx={{ color: 'white' }}/>} label={t('eventCentre')} />
            <FormControlLabel control={<Checkbox defaultChecked onChange={(e) => setOverlayVisibility(e, overlayVisibilityState, ['tentFill', 'tentBorder', 'tentLabel'])} sx={{ color: 'white' }}/>} label={t('Tents')} />
            <FormControlLabel control={<Checkbox defaultChecked onChange={(e) => setOverlayVisibility(e, overlayVisibilityState, ['forestFill'])} sx={{ color: 'white' }}/>} label={t('Harvests')} />
          </FormGroup>
        </Box>
      </SwipeableDrawer>
    </Root>
  )
}