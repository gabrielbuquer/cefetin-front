import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useRouter } from 'next/router';

interface MenuItem {
    title: string;
    options: {
        title: string;
        href: string;
    }[]
}

export default function BasicMenu(menu: MenuItem) {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickOption = (href: string) => {
    router.push(href);
    setAnchorEl(null);
  }

  return (
    
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {menu.title}
      </Button>
      
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {menu.options.map((option) => (
            <MenuItem key={option.title} onClick={() => handleClickOption(option.href)}>{option.title}</MenuItem>
        ))}
      </Menu>
    </div>
  );
}