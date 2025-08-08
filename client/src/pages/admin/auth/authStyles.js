export const boxWrapperStyles = {
  width: '70%',
  maxWidth: '500px',
  backgroundColor: 'rgba(50,50,50,0.6)',
  borderRadius: '10px',
  flexShrink: '0',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
};

export const tabListStyles = (activeIndex) => ({
  '& .MuiTab-root': {
    backgroundColor: 'rgba(30,30,30,0.6)',
    fontWeight: 'bold',
    color: '#667',
    flex: 1,
    transition: 'background-color 0.3s ease',
    '&:hover:not(.Mui-selected)': {
      color: '#a47a3b',
    },
    '&.Mui-selected': {
      color: '#fc9f14',
      backgroundColor: 'rgba(50,50,50,0.6)',
    },
  },
  '& .MuiTab-root:nth-of-type(1):not(.Mui-selected)': {
    borderTopLeftRadius: '10px',
  },
  '& .MuiTab-root:nth-of-type(2):not(.Mui-selected)': {
    borderTopRightRadius: '10px',
  },
  '& .MuiTab-root:nth-of-type(1).Mui-selected': {
    borderTopLeftRadius: '10px',
  },
  '& .MuiTab-root:nth-of-type(2).Mui-selected': {
    borderTopRightRadius: '10px',
  },
  '& .MuiTabs-indicator': {
    backgroundColor: '#fc9f14',
    width: '50% !important',
    left: activeIndex === 'login' ? '0%' : '50%',
    transition: 'left 0.3s ease',
  },
});

export const formControlStyles = {
  width: '80%',
  '& .MuiInputLabel-root': {
    color: '#fc9f14',
    marginLeft: '-10px',
    whiteSpace: 'nowrap',
    '&.Mui-focused': {
      color: '#fc9f14',
    },
    '&:hover': {
      color: '#a47a3b',
      opacity: 0.8,
    },
  },
  '& .MuiInput-root': {
    color: '#f5f3f0',
    width: '100%',
    '&:before': {
      borderBottomColor: '#fc9f14',
      borderBottomWidth: '2px',
    },
    '&:hover:not(.Mui-disabled):before': {
      borderBottomColor: '#fc9f14',
      borderBottomWidth: '2px',
    },
    '&:after': {
      borderBottomColor: '#fc9f14',
      borderBottomWidth: '2px',
    },
  },
};

export const boxPanelStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 2,
};

export const buttonStyles = {
  backgroundColor: '#fc9f14',
  color: '#f5f3f0',
  fontWeight: 'bold',
  width: '50%',
  fontSize: '1rem',

  borderRadius: '5px',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
  '&:hover': {
    backgroundColor: '#e28a06',
    boxShadow: '0 6px 14px rgba(0, 0, 0, 0.25)',
  },
  '&:active': {
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.2)',
    transform: 'translateY(1px)',
  },
};
